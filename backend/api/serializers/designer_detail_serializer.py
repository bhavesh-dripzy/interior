from rest_framework import serializers
from ..models import Designer, Project, Image


class ImageSerializer(serializers.ModelSerializer):
    """Serializer for Image model in project detail"""
    
    class Meta:
        model = Image
        fields = ['id', 'image_id', 'title', 'image_url', 'created_at']
        read_only_fields = ['id', 'created_at']


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer for Project detail within designer detail"""
    
    # Map fields to match frontend expectations
    name = serializers.CharField(source='project_title', read_only=True)
    thumbnail = serializers.CharField(source='image', read_only=True)
    images = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id',
            'project_id',
            'name',
            'project_title',
            'location',
            'thumbnail',
            'image',
            'image_count',
            'project_cost',
            'url',
            'images',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_images(self, obj):
        """Get all image URLs for this project (optimized via prefetch_related)"""
        # Use prefetched images if available (avoids extra query)
        if hasattr(obj, 'prefetched_images') and obj.prefetched_images:
            return [img.image_url for img in obj.prefetched_images]
        # Fallback: query images if not prefetched
        return list(obj.images.values_list('image_url', flat=True))


class DesignerDetailSerializer(serializers.ModelSerializer):
    """Serializer for Designer detail page - full information with projects"""
    
    # Map fields to match frontend expectations
    name = serializers.CharField(source='business_name', read_only=True)
    description = serializers.CharField(source='about_us', read_only=True)
    phone = serializers.CharField(source='phone_number', read_only=True)
    typicalJobCost = serializers.CharField(source='typical_job_cost', read_only=True)
    priceRange = serializers.CharField(source='typical_job_cost', read_only=True)
    location = serializers.CharField(source='address', read_only=True)
    
    # Nested serializers
    projects = ProjectDetailSerializer(many=True, read_only=True)
    
    # Computed fields for frontend compatibility
    portfolio = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    reviewsCount = serializers.SerializerMethodField()
    verified = serializers.SerializerMethodField()
    specialties = serializers.SerializerMethodField()
    
    class Meta:
        model = Designer
        fields = [
            'id',
            'name',
            'business_name',
            'description',
            'about_us',
            'category',
            'location',
            'address',
            'phone',
            'phone_number',
            'website',
            'typicalJobCost',
            'typical_job_cost',
            'priceRange',
            'followers',
            'socials',
            'services_provided',
            'areas_served',
            'professional_information',
            'additional_addresses',
            'portfolio',
            'projects',
            'rating',
            'reviewsCount',
            'verified',
            'specialties',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_portfolio(self, obj):
        """Get portfolio images from projects (thumbnail images from each project)"""
        # Use prefetched projects if available
        if hasattr(obj, 'prefetched_projects') and obj.prefetched_projects:
            return [p.image for p in obj.prefetched_projects if p.image]
        # Fallback: query projects
        portfolio_images = list(
            obj.projects.exclude(image__isnull=True)
                        .exclude(image='')
                        .order_by('id')
                        .values_list('image', flat=True)[:10]
        )
        return portfolio_images
    
    def get_rating(self, obj):
        """Default rating (not in DB, return 4.5 as default)"""
        return 4.5
    
    def get_reviewsCount(self, obj):
        """Default reviews count (not in DB, return 0 as default)"""
        return 0
    
    def get_verified(self, obj):
        """Default verified status (not in DB, return True as default)"""
        return True
    
    def get_specialties(self, obj):
        """Get specialties from category or return empty array"""
        # Could be enhanced based on your data structure
        # For now, return empty array as frontend expects an array
        return []

