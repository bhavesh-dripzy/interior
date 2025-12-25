from rest_framework import serializers
from ..models import Designer


class DesignerListingSerializer(serializers.ModelSerializer):
    """Serializer for Designer listing page - basic information only"""
    
    # Add computed fields
    project_count = serializers.IntegerField(read_only=True)
    featured_image = serializers.SerializerMethodField()
    intro = serializers.SerializerMethodField()
    
    class Meta:
        model = Designer
        fields = [
            'id',
            'business_name',
            'category',
            'address',
            'phone_number',
            'website',
            'typical_job_cost',
            'project_count',
            'featured_image',
            'intro',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
    
    def get_featured_image(self, obj):
        """Get the first project image as featured image (optimized via prefetch_related)"""
        # Use prefetched projects if available (avoids extra query)
        if hasattr(obj, 'prefetched_projects') and obj.prefetched_projects:
            first_project = obj.prefetched_projects[0] if obj.prefetched_projects else None
            if first_project:
                return first_project.image
        # Fallback: use projects manager (will query DB if not prefetched)
        first_project = obj.projects.first()
        if first_project:
            return first_project.image
        return None
    
    def get_intro(self, obj):
        """Get truncated description (about_us field) - max 100 characters"""
        description = obj.about_us or ""
        if len(description) > 100:
            return description[:100] + "..."
        return description

