import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { User, Mail, Phone, MapPin, Calendar, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

async function getUserProfile() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return { user: null, isSteward: false, reviews: [] }
  }

  try {
    // Get user with steward profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        stewardProfile: true,
        reviewsReceived: {
          include: {
            client: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            service: {
              select: {
                id: true,
                title: true,
                category: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
      },
    })

    if (!user) {
      return { user: null, isSteward: false, reviews: [] }
    }

    return { 
      user, 
      isSteward: !!user.stewardProfile,
      reviews: user.reviewsReceived || [],
    }
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    return { user: null, isSteward: false, reviews: [] }
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const { user, isSteward, reviews } = await getUserProfile()

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Profile Header */}
            <div className="px-4 py-5 sm:px-6 bg-chazon-primary text-white">
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                  <Avatar className="h-24 w-24 border-4 border-white">
                    <AvatarImage src={user.image || ''} alt={user.name || ''} />
                    <AvatarFallback className="text-2xl">
                      {user.name?.charAt(0) || <User className="w-8 h-8" />}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="mt-1 text-lg">
                    {isSteward ? 'Steward' : 'Customer'}
                    {isSteward && user.stewardProfile?.rating && (
                      <span className="ml-2 inline-flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        {user.stewardProfile.rating.toFixed(1)}
                        <span className="ml-1 text-sm">({user.stewardProfile.totalReviews || 0})</span>
                      </span>
                    )}
                  </p>
                  <p className="mt-1">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-auto">
                  <Link
                    href="/settings"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-chazon-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{user.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{user.address || 'Not provided'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">
                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Steward Information (if applicable) */}
            {isSteward && user.stewardProfile && (
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Steward Information</h2>
                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-900">Bio</h3>
                  <p className="mt-1 text-gray-600">{user.stewardProfile.bio || 'No bio provided.'}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-900">Skills</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {user.stewardProfile.skills && user.stewardProfile.skills.length > 0 ? (
                      user.stewardProfile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-chazon-primary-light text-chazon-primary"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600">No skills listed.</span>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-medium text-gray-900">Experience</h3>
                  <p className="mt-1 text-gray-600">{user.stewardProfile.experience || 'No experience information provided.'}</p>
                </div>
              </div>
            )}

            {/* Reviews Section (if steward) */}
            {isSteward && reviews.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Reviews</h2>
                <div className="mt-4 space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.client.image || ''} alt={review.client.name || ''} />
                            <AvatarFallback>
                              {review.client.name?.charAt(0) || <User className="w-4 h-4" />}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{review.client.name}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">
                              for {review.service.title} ({review.service.category.name})
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {reviews.length > 5 && (
                  <div className="mt-6 text-center">
                    <Link
                      href="/profile/reviews"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
                    >
                      View All Reviews
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}