'use client'

import { Star, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// Mock data for featured stewards
const featuredStewards = [
  {
    id: '1',
    name: 'Sarah Namutebi',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 165000,
    location: 'Nakasero, Kampala',
    skills: ['Furniture Assembly', 'TV Mounting', 'Handyman'],
    completedTasks: 234,
    responseTime: '1 hour',
    isVerified: true,
    bio: 'Professional handyman with 8+ years of experience. Specializing in furniture assembly and home repairs.'
  },
  {
    id: '2',
    name: 'Kato Okello',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 205000,
    location: 'Kololo, Kampala',
    skills: ['Moving', 'Delivery', 'Heavy Lifting'],
    completedTasks: 156,
    responseTime: '30 mins',
    isVerified: true,
    bio: 'Reliable moving specialist with a truck. Available for same-day moving and delivery services.'
  },
  {
    id: '3',
    name: 'Mary Nalubega',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5.0,
    reviewCount: 203,
    hourlyRate: 150000,
    location: 'Bugolobi, Kampala',
    skills: ['Cleaning', 'Organization', 'Deep Cleaning'],
    completedTasks: 312,
    responseTime: '2 hours',
    isVerified: true,
    bio: 'Detail-oriented cleaning professional. Eco-friendly products available upon request.'
  },
  {
    id: '4',
    name: 'David Omondi',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 145,
    hourlyRate: 240000,
    location: 'Ntinda, Kampala',
    skills: ['Electrical', 'Plumbing', 'Home Repair'],
    completedTasks: 189,
    responseTime: '45 mins',
    isVerified: true,
    bio: 'Licensed electrician and plumber. Available for emergency repairs and installations.'
  }
]

export function FeaturedStewards() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Stewards
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet some of our top-rated Stewards who are ready to help with your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStewards.map((steward) => (
            <Card key={steward.id} className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center mb-4">
                  <Avatar className="w-16 h-16 mr-4">
                    <AvatarImage src={steward.image} alt={steward.name} />
                    <AvatarFallback>{steward.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{steward.name}</h3>
                      {steward.isVerified && (
                        <CheckCircle className="w-4 h-4 text-chazon-primary" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{steward.rating}</span>
                      <span className="ml-1">({steward.reviewCount})</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{steward.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {steward.bio}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {steward.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {steward.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{steward.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-500">Completed Tasks</div>
                    <div className="font-semibold text-gray-900">{steward.completedTasks}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Response Time</div>
                    <div className="font-semibold text-gray-900 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {steward.responseTime}
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">UGX {steward.hourlyRate.toLocaleString()}</span>
                      <span className="text-gray-500">/hr</span>
                    </div>
                  </div>
                  <Button className="w-full bg-chazon-primary hover:bg-chazon-primary-dark">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Browse All Stewards
          </Button>
        </div>
      </div>
    </section>
  )
}