
export enum RoomType {
  LIVING = 'Living Room',
  BEDROOM = 'Bedroom',
  KITCHEN = 'Kitchen',
  WARDROBE = 'Wardrobe',
  BATHROOM = 'Bathroom',
  FULL_HOME = 'Full Home'
}

export enum StyleType {
  MODERN = 'Modern',
  MINIMALIST = 'Minimalist',
  TRADITIONAL = 'Traditional',
  BOHEMIAN = 'Bohemian',
  INDUSTRIAL = 'Industrial',
  SCANDINAVIAN = 'Scandinavian'
}

export interface DesignImage {
  id: string;
  url: string;
  room: RoomType;
  style: StyleType;
  estimatedBudget: number;
  emiStart: number;
}

export interface Project {
  id: string;
  name: string;
  location: string;
  imageCount: number;
  thumbnail: string;
  cost?: string;
  pinCode?: string;
  images?: string[];
}

export interface Designer {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  verified: boolean;
  specialties: RoomType[];
  priceRange: string;
  portfolio: string[];
  description: string;
  phone?: string;
  website?: string;
  address?: string;
  followers?: number;
  typicalJobCost?: string;
  projects?: Project[];
}

export interface ProjectRequirement {
  id: string;
  homeType: string;
  budgetRange: string;
  timeline: string;
  city: string;
  description: string;
  status: 'Open' | 'Closed' | 'Draft';
  images?: string[];
}

export interface DesignerResponse {
  id: string;
  designerId: string;
  designerName: string;
  estimatedCost: number;
  timeline: string;
  styleMatchScore: number;
  emiStart: number;
  message: string;
}
