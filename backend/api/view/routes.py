"""
Routes configuration for API endpoints
Centralized routing file for all API paths
"""
from django.urls import path
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .designer_view import designer_listing
from .designer_detail_view import designer_detail


@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    return Response({'status': 'ok', 'message': 'API is running'})


urlpatterns = [
    # Health check
    path('health/', health_check, name='health-check'),
    
    # Designer routes
    path('designers/', designer_listing, name='designer-listing'),
    path('designers/<int:designer_id>/', designer_detail, name='designer-detail'),
]

