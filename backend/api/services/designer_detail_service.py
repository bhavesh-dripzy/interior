from django.shortcuts import get_object_or_404
from django.db.models import Prefetch
from ..models import Designer, Project
from ..serializers.designer_detail_serializer import DesignerDetailSerializer


class DesignerDetailService:
    """Service layer for Designer detail-related business logic"""
    
    @staticmethod
    def get_designer_detail(designer_id):
        """
        Get detailed information about a single designer (optimized query)
        
        Args:
            designer_id (int): ID of the designer
        
        Returns:
            dict: Designer detail data with all projects and images
        """
        # Optimized queryset: prefetch projects in a single query
        # Note: We don't prefetch images here since ProjectBasicSerializer doesn't include them
        # This prevents N+1 query problems and improves performance
        queryset = Designer.objects.prefetch_related(
            Prefetch(
                'projects',
                queryset=Project.objects.order_by('id'),
                to_attr='prefetched_projects'
            )
        )
        
        # Get designer or raise 404
        designer = get_object_or_404(queryset, id=designer_id)
        
        # Serialize data
        serializer = DesignerDetailSerializer(designer)
        
        return serializer.data

