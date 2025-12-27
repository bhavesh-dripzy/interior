from rest_framework import serializers
from ..models import Designer, Project


class ProjectBasicSerializer(serializers.ModelSerializer):
    """Serializer for Project basic info within designer detail (without images)"""
    
    # Map fields to match frontend expectations
    name = serializers.CharField(source='project_title', read_only=True)
    thumbnail = serializers.CharField(source='image', read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id',
            'project_id',
            'name',
            'location',
            'thumbnail',
            'image_count',
            'project_cost',
            'url',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class DesignerDetailSerializer(serializers.ModelSerializer):
    """Serializer for Designer detail page - full information with projects"""
    
    # Map fields to match frontend expectations
    name = serializers.CharField(source='business_name', read_only=True)
    description = serializers.CharField(source='about_us', read_only=True)
    phone = serializers.CharField(source='phone_number', read_only=True)
    typicalJobCost = serializers.CharField(source='typical_job_cost', read_only=True)
    priceRange = serializers.CharField(source='typical_job_cost', read_only=True)
    location = serializers.CharField(source='address', read_only=True)
    
    # Nested serializers - use basic serializer (without images)
    projects = ProjectBasicSerializer(many=True, read_only=True)
    
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
            'description',
            'category',
            'location',
            'phone',
            'website',
            'typicalJobCost',
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

