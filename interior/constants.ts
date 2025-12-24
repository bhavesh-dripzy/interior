
import { RoomType, StyleType, DesignImage, Designer } from './types';

export const MOCK_DESIGNS: DesignImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800', room: RoomType.LIVING, style: StyleType.MODERN, estimatedBudget: 450000, emiStart: 8999 },
  { id: '2', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800', room: RoomType.KITCHEN, style: StyleType.MINIMALIST, estimatedBudget: 250000, emiStart: 5499 },
  { id: '3', url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800', room: RoomType.BEDROOM, style: StyleType.BOHEMIAN, estimatedBudget: 180000, emiStart: 3999 },
  { id: '4', url: 'https://images.unsplash.com/photo-1558976825-6b1b03a03719?auto=format&fit=crop&q=80&w=800', room: RoomType.WARDROBE, style: StyleType.MODERN, estimatedBudget: 85000, emiStart: 1999 },
  { id: '5', url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800', room: RoomType.LIVING, style: StyleType.INDUSTRIAL, estimatedBudget: 550000, emiStart: 11999 },
  { id: '6', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800', room: RoomType.KITCHEN, style: StyleType.MODERN, estimatedBudget: 320000, emiStart: 6999 },
  { id: '7', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800', room: RoomType.BEDROOM, style: StyleType.SCANDINAVIAN, estimatedBudget: 210000, emiStart: 4499 },
  { id: '8', url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800', room: RoomType.LIVING, style: StyleType.TRADITIONAL, estimatedBudget: 600000, emiStart: 12999 },
];

export const MOCK_DESIGNERS: Designer[] = [
  {
    id: 'd1',
    name: 'KREATIVE HOUSE',
    rating: 4.8,
    reviewsCount: 124,
    location: 'HYDERABAD',
    verified: true,
    specialties: [RoomType.FULL_HOME, RoomType.LIVING],
    priceRange: '₹5L - ₹20L',
    portfolio: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200'],
    description: 'Specializing in luxury residential and commercial transformations. Our design philosophy blends contemporary aesthetics with functional excellence to create bespoke living spaces.',
    phone: '09876 54321',
    website: 'kreativehouse.in',
    address: 'Banjara Hills, Road No. 12, Hyderabad, Telangana 500034',
    followers: 1240,
    typicalJobCost: '₹5 Lakh - ₹20 Lakh',
    projects: [
      { 
        id: 'p1', 
        name: 'The Curated Nest', 
        location: 'Jubilee Hills, Hyderabad', 
        imageCount: 32, 
        thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600',
        cost: '₹75,00,001 - ₹1,00,00,000',
        pinCode: '500034',
        images: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800'
        ]
      },
      { 
        id: 'p2', 
        name: 'Modern Minimalist Villa', 
        location: 'Gachibowli, Hyderabad', 
        imageCount: 18, 
        thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600',
        cost: '₹25,00,000 - ₹50,00,000',
        pinCode: '500032',
        images: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800'
        ]
      },
      { id: 'p5', name: 'Godrej Woods', location: 'Hyderabad', imageCount: 12, thumbnail: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600' },
      { id: 'p6', name: 'Jain\'s Luxury Penthouse', location: 'Hyderabad', imageCount: 24, thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600' }
    ]
  },
  {
    id: 'd2',
    name: 'ECOINCH SERVICES',
    rating: 4.6,
    reviewsCount: 89,
    location: 'NOIDA, NCR',
    verified: true,
    specialties: [RoomType.KITCHEN, RoomType.WARDROBE],
    priceRange: '₹2L - ₹8L',
    portfolio: ['https://images.unsplash.com/photo-1556912177-c54030639a03?auto=format&fit=crop&q=80&w=1200'],
    description: 'Pioneering sustainable and eco-friendly interior solutions. We focus on modular kitchens and smart storage options that maximize utility without compromising on style.',
    phone: '0120 456 7890',
    website: 'ecoinch.com',
    address: 'Sector 62, Noida, Uttar Pradesh 201309',
    followers: 850,
    typicalJobCost: '₹2 Lakh - ₹8 Lakh',
    projects: [
      { 
        id: 'p3', 
        name: 'Project Cleo County', 
        location: 'Sector 121, Noida, UP', 
        imageCount: 20, 
        thumbnail: 'https://images.unsplash.com/photo-1556912177-c54030639a03?auto=format&fit=crop&q=80&w=600',
        cost: '₹10,00,000 - ₹20,00,000',
        pinCode: '201305',
        images: [
          'https://images.unsplash.com/photo-1556912177-c54030639a03?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
        ]
      }
    ]
  },
  {
    id: 'd3',
    name: 'RICHIKA CHOPRA',
    rating: 4.9,
    reviewsCount: 256,
    location: 'KOLKATA',
    verified: true,
    specialties: [RoomType.BEDROOM, RoomType.FULL_HOME],
    priceRange: '₹4L - ₹15L',
    portfolio: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'],
    description: 'Award-winning designer with over a decade of experience in creating warmth and elegance. Specialized in full home renovations and artistic bedroom concepts.',
    phone: '033 2456 7890',
    website: 'richikachopra.com',
    address: 'Park Street, Kolkata, West Bengal 700016',
    followers: 3200,
    typicalJobCost: '₹4 Lakh - ₹15 Lakh',
    projects: [
      { id: 'p4', name: 'Heritage Penthouse', location: 'Alipore, Kolkata', imageCount: 45, thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600' }
    ]
  }
];

export const CITIES = ['Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'];
export const BUDGET_RANGES = ['Below ₹2L', '₹2L - ₹5L', '₹5L - ₹10L', '₹10L - ₹25L', 'Above ₹25L'];
