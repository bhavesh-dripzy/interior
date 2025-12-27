from django.db.models import Count, Q, Prefetch
from ..models import Designer, Project
from ..serializers.designer_listing_serializer import DesignerListingSerializer


class DesignerService:
    """Service layer for Designer-related business logic"""
    
    @staticmethod
    def get_designers_list(filters=None, ordering=None, page=1, page_size=20):
        """
        Get list of designers with basic information (optimized query)
        
        Args:
            filters (dict): Optional filters (category, search, etc.)
            ordering (str): Optional ordering field (default: 'id')
            page (int): Page number (default: 1)
            page_size (int): Items per page (default: 20)
        
        Returns:
            dict: Contains designers list and pagination info
        """
        # Optimized queryset: annotate project_count, prefetch only first project for featured_image
        # Note: Django's Prefetch doesn't support slicing in the queryset, so we'll handle it in serializer
        queryset = Designer.objects.annotate(
            project_count=Count('projects')
        ).prefetch_related(
            Prefetch(
                'projects',
                queryset=Project.objects.order_by('id').only('id', 'image', 'designer_id'),
                to_attr='prefetched_projects'
            )
        )
        
        # Apply filters
        if filters:
            # Category filter
            if filters.get('category'):
                queryset = queryset.filter(category__icontains=filters['category'])
            
            # Search filter (search in business_name, address, category)
            if filters.get('search'):
                search_term = filters['search']
                queryset = queryset.filter(
                    Q(business_name__icontains=search_term) |
                    Q(address__icontains=search_term) |
                    Q(category__icontains=search_term)
                )
        
        # Apply ordering (default: id ascending - id=1, then id=2, etc.)
        if ordering:
            queryset = queryset.order_by(ordering)
        else:
            queryset = queryset.order_by('id')
        
        # Get total count before pagination
        total_count = queryset.count()
        
        # Apply pagination (always paginated)
        offset = (page - 1) * page_size
        queryset = queryset[offset:offset + page_size]
        
        # Serialize data
        serializer = DesignerListingSerializer(queryset, many=True)
        
        # Calculate pagination metadata
        total_pages = (total_count + page_size - 1) // page_size if page_size > 0 else 0
        
        return {
            'designers': serializer.data,
            'total': total_count,
            'page': page,
            'page_size': page_size,
            'total_pages': total_pages,
            'has_next': page < total_pages,
            'has_previous': page > 1
        }

