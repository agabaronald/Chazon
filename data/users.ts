import type { User } from '@/types/user'

export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-0104',
  location: 'Fremont, Seattle',
  isSteward: false,
  isVerified: true,
  rating: 0,
  totalReviews: 0,
  image: '',
  createdAt: new Date().toISOString(),
}

export const stewards: User[] = [
  {
    id: 'stew-1',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1-555-0102',
    bio: 'Experienced handyman specializing in furniture assembly and home repairs.',
    location: 'Capitol Hill, Seattle',
    isSteward: true,
    isVerified: true,
    rating: 4.8,
    totalReviews: 89,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'stew-2',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    phone: '+1-555-0103',
    bio: 'Detail-oriented cleaning professional. Eco-friendly products available upon request.',
    location: 'Ballard, Seattle',
    isSteward: true,
    isVerified: true,
    rating: 5.0,
    totalReviews: 203,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date().toISOString(),
  },
]

