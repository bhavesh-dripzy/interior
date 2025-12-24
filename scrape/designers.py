import os
import sys
import django

# Add the backend directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

import requests
from bs4 import BeautifulSoup
import json
from concurrent.futures import ThreadPoolExecutor, as_completed

# Import Django models
from api.models import Designer, Project, Image

URL = "https://www.houzz.in/pro/gagandeep-kaur44/homez-designer"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

# =========================
# FUNCTION: SCRAPE PROJECT DETAILS
# =========================

def scrape_project_details(project_url):
    BASE_URL = "https://www.houzz.in"

    if project_url.startswith("/"):
        project_url = BASE_URL + project_url

    res = requests.get(project_url, headers=HEADERS, timeout=20)
    soup = BeautifulSoup(res.text, "html.parser")

    project_data = {}

    # =========================
    # PROJECT TITLE
    # =========================
    title = soup.find("h1", class_="project-header")
    project_data["project_title"] = title.get_text(strip=True) if title else None

    # =========================
    # PROJECT COST ✅ NEW
    # =========================
    project_cost = None
    project_desc = soup.find("div", id="projectDesc")

    if project_desc:
        for span in project_desc.find_all("span"):
            text = span.get_text(strip=True)
            if text.startswith("Project Cost"):
                project_cost = text.replace("Project Cost:", "").strip()
                break

    project_data["project_cost"] = project_cost

    # =========================
    # COLLECT PHOTO LINKS
    # =========================
    photo_jobs = []

    for link in soup.select("a.hz-space-card[href*='/photos/']"):
        photo_url = link.get("href")
        image_id = link.get("data-entity-id")

        if not photo_url:
            continue

        if photo_url.startswith("/"):
            photo_url = BASE_URL + photo_url

        photo_jobs.append((photo_url, image_id))

    images = []

    # =========================
    # WORKER FUNCTION
    # =========================
    def fetch_photo(photo_url, image_id):
        try:
            r = requests.get(photo_url, headers=HEADERS, timeout=20)
            s = BeautifulSoup(r.text, "html.parser")

            og_image = s.find("meta", property="og:image")
            if not og_image:
                return None

            image_url = og_image.get("content")
            if not image_url or image_url.startswith("data:image"):
                return None

            og_title = s.find("meta", property="og:title")
            title = og_title.get("content") if og_title else None

            return {
                "image_id": image_id,
                "title": title,
                "image_url": image_url
            }

        except Exception:
            return None

    # =========================
    # THREADED EXECUTION ⚡
    # =========================
    with ThreadPoolExecutor(max_workers=8) as executor:
        futures = [
            executor.submit(fetch_photo, url, img_id)
            for url, img_id in photo_jobs
        ]

        for future in as_completed(futures):
            result = future.result()
            if result:
                images.append(result)

    project_data["images"] = images
    project_data["image_count"] = len(images)

    return project_data


# =========================
# FUNCTION: SAVE TO DATABASE
# =========================

def save_to_database(data):
    """Save scraped data to database"""
    
    # Get or create Designer
    details = data.get("details", {})
    business_details = data.get("business_details", {})
    
    designer, created = Designer.objects.update_or_create(
        business_name=business_details.get("Business Name", "Unknown"),
        defaults={
            "about_us": data.get("about_us"),
            "services_provided": details.get("Services Provided"),
            "areas_served": details.get("Areas Served"),
            "professional_information": details.get("Professional Information"),
            "category": details.get("Category"),
            "phone_number": business_details.get("Phone Number"),
            "website": business_details.get("Website"),
            "address": business_details.get("Address"),
            "additional_addresses": business_details.get("Additional Addresses"),
            "typical_job_cost": business_details.get("Typical Job Cost"),
            "followers": business_details.get("Followers"),
            "socials": business_details.get("Socials"),
        }
    )
    
    print(f"{'Created' if created else 'Updated'} designer: {designer.business_name}")
    
    # Process Projects
    projects_data = data.get("projects", [])
    
    for project_data in projects_data:
        project_id = project_data.get("project_id")
        if not project_id:
            continue
        
        project_details = project_data.get("project_details", {})
        
        # Create or update Project
        project, project_created = Project.objects.update_or_create(
            project_id=project_id,
            defaults={
                "designer": designer,
                "url": project_data.get("url"),
                "image": project_data.get("image"),
                "title": project_data.get("title"),
                "location": project_data.get("location"),
                "photos": project_data.get("photos"),
                "project_title": project_details.get("project_title"),
                "project_cost": project_details.get("project_cost"),
                "image_count": project_details.get("image_count", 0),
            }
        )
        
        print(f"  {'Created' if project_created else 'Updated'} project: {project.project_title or project.title}")
        
        # Delete existing images for this project to avoid duplicates
        Image.objects.filter(project=project).delete()
        
        # Save Images
        images_data = project_details.get("images", [])
        image_objects = []
        
        for img_data in images_data:
            if not img_data.get("image_id"):
                continue
            
            image_obj = Image(
                project=project,
                image_id=img_data.get("image_id"),
                title=img_data.get("title"),
                image_url=img_data.get("image_url"),
            )
            image_objects.append(image_obj)
        
        # Bulk create images for better performance
        if image_objects:
            Image.objects.bulk_create(image_objects, ignore_conflicts=True)
            print(f"    Saved {len(image_objects)} images")
    
    print(f"\n✅ Total projects saved: {len(projects_data)}")
    return designer


# =========================
# MAIN SCRAPER
# =========================

def main():
    print("🚀 Starting scraper...")
    
    response = requests.get(URL, headers=HEADERS)
    soup = BeautifulSoup(response.text, "html.parser")

    output = {}

    # =========================
    # ABOUT US
    # =========================
    about_section = soup.find("section", id="about-us")

    if about_section:
        about_div = about_section.select_one('div[class*="ProfileAbout__HtmlBlock"]')
        output["about_us"] = about_div.get_text(" ", strip=True) if about_div else None

        subsections = {}
        for h3 in about_section.find_all("h3"):
            title = h3.get_text(strip=True)
            p = h3.find_next_sibling("p")
            subsections[title] = p.get_text(" ", strip=True) if p else None

        output["details"] = subsections

    # =========================
    # PROJECTS
    # =========================
    projects = []
    projects_section = soup.find("section", id="projects")

    if projects_section:
        cards = projects_section.select('div[data-testid="image-card"]')

        for card in cards:
            project = {
                "project_id": card.get("data-entity-id")
            }

            link = card.select_one('a[data-testid="image-card-link"]')
            project_url = link["href"] if link else None
            project["url"] = project_url

            img = card.find("img")
            project["image"] = img["src"] if img else None

            title = card.find("h3")
            project["title"] = title.get_text(strip=True) if title else None

            location = None
            for span in card.find_all("span"):
                txt = span.get_text(strip=True)
                if "," in txt and len(txt) > 8:
                    location = txt
                    break
            project["location"] = location

            photo_count = card.select_one('div[aria-label*="Photos"] span')
            project["photos"] = photo_count.get_text(strip=True) if photo_count else None

            # =========================
            # SCRAPE PROJECT DETAILS
            # =========================
            if project_url:
                print(f"  Scraping project details: {project.get('title', project.get('project_id'))}")
                project_details = scrape_project_details(project_url)
                project["project_details"] = project_details

            projects.append(project)

    output["projects"] = projects

    # =========================
    # BUSINESS DETAILS
    # =========================
    business_details = {}

    business_container = soup.find("div", {"data-container": "Business Details"})

    if business_container:
        cells = business_container.select(".hui-cell")

        for cell in cells:
            label = cell.find("h3")
            value = cell.find("p") or cell.find("div")

            if not label or not value:
                continue

            key = label.get_text(strip=True)
            text = value.get_text(" ", strip=True)

            business_details[key] = text

    output["business_details"] = business_details

    # =========================
    # SAVE TO DATABASE
    # =========================
    print("\n💾 Saving to database...")
    designer = save_to_database(output)
    
    # Also save JSON for backup
    with open("houzz_profile.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print("\n✅ Scraping complete!")
    print(f"✅ Designer saved: {designer.business_name}")
    print(f"✅ File saved: houzz_profile.json")
    print(f"✅ Database updated successfully")


if __name__ == "__main__":
    main()
