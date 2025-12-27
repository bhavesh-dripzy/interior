from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from ..services.project_detail_service import ProjectDetailService
from ..models import Project


@api_view(['GET'])
def project_detail(request, project_id):
    """
    API endpoint to get detailed information about a single project
    
    URL Parameters:
        - project_id (int): ID of the project
    
    Returns:
        Response with project detail including all images
    """
    try:
        # Get project detail from service layer
        project_data = ProjectDetailService.get_project_detail(project_id)
        
        return Response({
            'success': True,
            'data': project_data
        }, status=status.HTTP_200_OK)
        
    except Http404:
        return Response({
            'success': False,
            'error': 'Project not found',
            'message': f'Project with ID {project_id} does not exist'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e),
            'message': 'Error fetching project detail'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

