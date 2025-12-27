from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from ..models import Project, Image
from ..serializers.project_detail_serializer import ProjectDetailSerializer


class ProjectDetailService:
    """Service layer for Project detail-related business logic"""
    
    @staticmethod
    def get_project_detail(project_id):
        """
        Get detailed information about a single project (optimized query)
        
        Args:
            project_id (int): ID of the project
        
        Returns:
            dict: Project detail data with all images
        """
        # Optimized queryset: prefetch images in a single query
        # This prevents N+1 query problems
        queryset = Project.objects.prefetch_related(
            Prefetch(
                'images',
                queryset=Image.objects.order_by('id').only('id', 'image_id', 'image_url', 'title', 'project_id', 'created_at')
            )
        )
        
        # Get project or raise 404
        project = get_object_or_404(queryset, id=project_id)
        
        # Serialize data
        serializer = ProjectDetailSerializer(project)
        
        return serializer.data

