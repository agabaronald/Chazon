import type { Service } from '@/types/service'
import { categories } from './categories'
import { stewards } from './users'

export const services: Service[] = [
  {
    id: 'svc-1',
    title: 'IKEA Furniture Assembly',
    description: 'Professional assembly of IKEA and other flat-pack furniture. Fast and reliable service.',
    price: 75,
    duration: 90,
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop'],
    category: categories.find(c => c.slug === 'furniture-assembly')!,
    steward: {
      id: stewards[0].id,
      name: stewards[0].name,
      image: stewards[0].image,
      rating: stewards[0].rating,
      totalReviews: stewards[0].totalReviews,
      bio: stewards[0].bio,
    },
  },
  {
    id: 'svc-2',
    title: 'Deep Home Cleaning',
    description: 'Thorough cleaning of kitchens, bathrooms, and living spaces. Eco-friendly options available.',
    price: 120,
    duration: 180,
    images: ['https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80&auto=format&fit=crop'],
    category: categories.find(c => c.slug === 'cleaning')!,
    steward: {
      id: stewards[1].id,
      name: stewards[1].name,
      image: stewards[1].image,
      rating: stewards[1].rating,
      totalReviews: stewards[1].totalReviews,
      bio: stewards[1].bio,
    },
  },
]
