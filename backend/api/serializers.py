# This file is kept for backward compatibility
# All serializers are now in the serializers/ package
from .serializers import (
    DesignerListingSerializer,
    DesignerDetailSerializer,
    ProjectDetailSerializer,
    ImageSerializer,
)

__all__ = [
    'DesignerListingSerializer',
    'DesignerDetailSerializer',
    'ProjectDetailSerializer',
    'ImageSerializer',
]


class DesignerListingSerializer(serializers.ModelSerializer):
    """Serializer for Designer listing page - basic information only"""
    
    # Add computed fields
    project_count = serializers.IntegerField(read_only=True)
    featured_image = serializers.SerializerMethodField()
    
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
            'followers',
            'project_count',
            'featured_image',
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

