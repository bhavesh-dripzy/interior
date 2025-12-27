from rest_framework import serializers
from ..models import Project, Image


class ImageSerializer(serializers.ModelSerializer):
    """Serializer for Image model in project detail"""
    
    class Meta:
        model = Image
        fields = ['id', 'image_id', 'title', 'image_url', 'created_at']
        read_only_fields = ['id', 'created_at']


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer for Project detail API - full information with images"""
    
    # Map fields to match frontend expectations
    name = serializers.CharField(source='project_title', read_only=True)
    thumbnail = serializers.CharField(source='image', read_only=True)
    
    # Nested serializer for images
    images = ImageSerializer(many=True, read_only=True)
    
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

