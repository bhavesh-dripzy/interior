from django.urls import path, include
from .view.routes import urlpatterns as view_routes
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def health_check(request):
    return Response({'status': 'ok', 'message': 'API is running'})

# Include all routes from routes.py
urlpatterns = view_routes

