from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from ..services.designer_detail_service import DesignerDetailService
from ..models import Designer


@api_view(['GET'])
def designer_detail(request, designer_id):
    """
    API endpoint to get detailed information about a single designer
    
    URL Parameters:
        - designer_id (int): ID of the designer
    
    Returns:
        Response with designer detail including all projects and images
    """
    try:
        # Get designer detail from service layer
        designer_data = DesignerDetailService.get_designer_detail(designer_id)
        
        return Response({
            'success': True,
            'data': designer_data
        }, status=status.HTTP_200_OK)
        
    except Http404:
        return Response({
            'success': False,
            'error': 'Designer not found',
            'message': f'Designer with ID {designer_id} does not exist'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e),
            'message': 'Error fetching designer detail'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

