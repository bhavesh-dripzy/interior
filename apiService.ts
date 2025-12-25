/**
 * API Service for communicating with the backend Django API
 * Follows best practices: error handling, type safety, and centralized configuration
 */

import { Designer, Project } from './types';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Types for API responses
export interface ApiDesignerListing {
  id: number;
  business_name: string;
  category: string | null;
  address: string | null;
  phone_number: string | null;
  website: string | null;
  typical_job_cost: string | null;
  project_count: number;
  featured_image: string | null;
  intro: string | null;
  created_at: string;
}

export interface ApiPagination {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
  count: number;
}

export interface ApiDesignerListingResponse {
  success: boolean;
  data: ApiDesignerListing[];
  pagination: ApiPagination;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
}

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic API request function with error handling
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData: ApiErrorResponse = await response.json().catch(() => ({
        success: false,
        error: 'Unknown error',
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      
      throw new ApiError(
        errorData.message || errorData.error || 'An error occurred',
        response.status,
        errorData
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors or other fetch errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      error
    );
  }
}

/**
 * Get list of designers with optional filters and pagination
 */
export interface GetDesignersParams {
  category?: string;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

export async function getDesigners(
  params: GetDesignersParams = {}
): Promise<ApiDesignerListingResponse> {
  const queryParams = new URLSearchParams();
  
  if (params.category) queryParams.append('category', params.category);
  if (params.search) queryParams.append('search', params.search);
  if (params.ordering) queryParams.append('ordering', params.ordering);
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.page_size) queryParams.append('page_size', params.page_size.toString());

  const queryString = queryParams.toString();
  const endpoint = `/designers/${queryString ? `?${queryString}` : ''}`;

  return apiRequest<ApiDesignerListingResponse>(endpoint);
}

// Export API base URL for debugging
export { API_BASE_URL };

/**
 * Map API designer listing response to frontend Designer type
 */
export function mapApiDesignerToDesigner(apiDesigner: ApiDesignerListing): Designer {
  return {
    id: apiDesigner.id.toString(),
    name: apiDesigner.business_name || 'Unknown Designer',
    rating: 4.5, // Default value as API doesn't provide this
    reviewsCount: 0, // Default value as API doesn't provide this
    location: apiDesigner.address || 'Location not specified',
    verified: true, // Default value as API doesn't provide this
    specialties: [], // Default empty array as API doesn't provide this
    priceRange: apiDesigner.typical_job_cost || 'Price on request',
    portfolio: apiDesigner.featured_image ? [apiDesigner.featured_image] : [],
    description: apiDesigner.intro || 'No description available',
    phone: apiDesigner.phone_number || undefined,
    website: apiDesigner.website || undefined,
    address: apiDesigner.address || undefined,
    typicalJobCost: apiDesigner.typical_job_cost || undefined,
  };
}

// Types for Designer Detail API Response
export interface ApiProjectBasic {
  id: number;
  project_id: string;
  name: string;
  location: string | null;
  thumbnail: string | null;
  image_count: number;
  project_cost: string | null;
  url: string | null;
  created_at: string;
}

export interface ApiDesignerDetail {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  location: string | null;
  phone: string | null;
  website: string | null;
  typicalJobCost: string | null;
  priceRange: string | null;
  followers: string | null;
  socials: string | null;
  services_provided: string | null;
  areas_served: string | null;
  professional_information: string | null;
  additional_addresses: string | null;
  portfolio: string[];
  projects: ApiProjectBasic[];
  rating: number;
  reviewsCount: number;
  verified: boolean;
  specialties: string[];
  created_at: string;
  updated_at: string;
}

export interface ApiDesignerDetailResponse {
  success: boolean;
  data: ApiDesignerDetail;
}

// Types for Project Detail API Response
export interface ApiImage {
  id: number;
  image_id: string;
  title: string | null;
  image_url: string;
  created_at: string;
}

export interface ApiProjectDetail {
  id: number;
  project_id: string;
  name: string;
  project_title: string | null;
  location: string | null;
  thumbnail: string | null;
  image: string | null;
  image_count: number;
  project_cost: string | null;
  url: string | null;
  images: ApiImage[];
  created_at: string;
}

export interface ApiProjectDetailResponse {
  success: boolean;
  data: ApiProjectDetail;
}

/**
 * Get designer detail by ID
 */
export async function getDesignerDetail(designerId: number | string): Promise<ApiDesignerDetailResponse> {
  const endpoint = `/designers/${designerId}/`;
  return apiRequest<ApiDesignerDetailResponse>(endpoint);
}

/**
 * Get project detail by ID
 */
export async function getProjectDetail(projectId: number | string): Promise<ApiProjectDetailResponse> {
  const endpoint = `/projects/${projectId}/`;
  return apiRequest<ApiProjectDetailResponse>(endpoint);
}

/**
 * Map API project basic to frontend Project type
 */
export function mapApiProjectBasicToProject(apiProject: ApiProjectBasic): Project {
  return {
    id: apiProject.id.toString(),
    name: apiProject.name || 'Untitled Project',
    location: apiProject.location || 'Location not specified',
    imageCount: apiProject.image_count,
    thumbnail: apiProject.thumbnail || '',
    cost: apiProject.project_cost || undefined,
  };
}

/**
 * Map API designer detail response to frontend Designer type
 */
export function mapApiDesignerDetailToDesigner(apiDesigner: ApiDesignerDetail): Designer {
  return {
    id: apiDesigner.id.toString(),
    name: apiDesigner.name || 'Unknown Designer',
    rating: apiDesigner.rating,
    reviewsCount: apiDesigner.reviewsCount,
    location: apiDesigner.location || 'Location not specified',
    verified: apiDesigner.verified,
    specialties: [], // API returns empty array, keeping as is
    priceRange: apiDesigner.priceRange || apiDesigner.typicalJobCost || 'Price on request',
    portfolio: apiDesigner.portfolio || [],
    description: apiDesigner.description || 'No description available',
    phone: apiDesigner.phone || undefined,
    website: apiDesigner.website || undefined,
    address: apiDesigner.location || undefined,
    typicalJobCost: apiDesigner.typicalJobCost || undefined,
    projects: apiDesigner.projects?.map(mapApiProjectBasicToProject) || [],
  };
}

/**
 * Map API project detail response to frontend Project type
 */
export function mapApiProjectDetailToProject(apiProject: ApiProjectDetail): Project {
  return {
    id: apiProject.id.toString(),
    name: apiProject.name || apiProject.project_title || 'Untitled Project',
    location: apiProject.location || 'Location not specified',
    imageCount: apiProject.image_count,
    thumbnail: apiProject.thumbnail || apiProject.image || '',
    cost: apiProject.project_cost || undefined,
    images: apiProject.images?.map(img => img.image_url) || [],
  };
}

