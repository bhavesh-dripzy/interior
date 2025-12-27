from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..services.designer_service import DesignerService


@api_view(['GET'])
def designer_listing(request):
    """
    API endpoint to list all designers with basic information (paginated)
    
    Query Parameters:
        - category (str): Filter by category
        - search (str): Search in business name, address, category
        - ordering (str): Order by field (e.g., 'id', '-id', 'business_name', '-created_at')
                          Default: 'id' (ascending: id=1, then id=2, etc.)
        - page (int): Page number for pagination (default: 1)
        - page_size (int): Number of items per page (default: 20)
    
    Returns:
        Response with paginated list of designers and metadata
    """
    try:
        # Extract query parameters
        filters = {
            'category': request.query_params.get('category'),
            'search': request.query_params.get('search'),
        }
        
        # Remove None values
        filters = {k: v for k, v in filters.items() if v is not None}
        
        # Default ordering is 'id' (ascending: id=1, id=2, etc.)
        ordering = request.query_params.get('ordering', 'id')
        
        # Pagination parameters (always paginated)
        try:
            page = int(request.query_params.get('page', 1))
            if page < 1:
                page = 1
        except (ValueError, TypeError):
            page = 1
        
        try:
            page_size = int(request.query_params.get('page_size', 20))
            if page_size < 1:
                page_size = 20
            # Limit max page size to prevent abuse
            if page_size > 100:
                page_size = 100
        except (ValueError, TypeError):
            page_size = 20
        
        # Get designers from service layer
        result = DesignerService.get_designers_list(
            filters=filters if filters else None,
            ordering=ordering,
            page=page,
            page_size=page_size
        )
        
        return Response({
            'success': True,
            'data': result['designers'],
            'pagination': {
                'total': result['total'],
                'page': result['page'],
                'page_size': result['page_size'],
                'total_pages': result['total_pages'],
                'has_next': result['has_next'],
                'has_previous': result['has_previous'],
                'count': len(result['designers'])
            }
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e),
            'message': 'Error fetching designers list'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

