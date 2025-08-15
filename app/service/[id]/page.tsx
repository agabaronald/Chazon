import { prisma } from '@/lib/prisma'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ServiceImageGallery } from '@/components/ui/service-image-gallery'
import { Badge } from '@/components/ui/badge'
import { BookNowButton } from '@/components/ui/book-now-button'
import { ReviewCard } from '@/components/ui/review-card'
import type { Prisma } from '@prisma/client'

// Define a precise, Prisma-generated type for the service details
const serviceDetailInclude = {
  category: { select: { name: true } },
  steward: {
    select: {
      id: true,
      name: true,
      image: true,
      rating: true,
      totalReviews: true,
      bio: true,
      reviewsReceived: {
        include: {
          reviewer: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc' as const,
        },
      },
    },
  },
}

type ServiceDetails = Prisma.ServiceGetPayload<{
  include: typeof serviceDetailInclude
}>

interface ServiceDetailPageProps {
  params: { id: string }
}

async function getServiceDetails(id: string): Promise<ServiceDetails | null> {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: serviceDetailInclude,
    })
    return service
  } catch (error) {
    console.error('Failed to fetch service details:', error)
    return null
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = await getServiceDetails(params.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-2">
              <ServiceImageGallery images={service.images} title={service.title} />
            </div>

            {/* Right Column: Service Info & Booking */}
            <div className="lg:col-span-1">
              <Badge variant="secondary" className="mb-2">
                {service.category.name}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>
              <p className="text-2xl font-bold text-green-600 mb-6">
                ${service.price.toFixed(2)}
              </p>
              <BookNowButton serviceId={service.id} />

              {/* Steward Info */}
              <div className="bg-gray-50 p-6 rounded-2xl mt-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={service.steward.image || '/default-avatar.png'}
                    alt={service.steward.name || 'Steward'}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {service.steward.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-semibold">
                        {service.steward.rating?.toFixed(1) || 'New'}
                      </span>
                      <span className="ml-1">
                        ({service.steward.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{service.steward.bio}</p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Description & Reviews */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              About this service
            </h2>
            <p className="text-lg text-gray-700 whitespace-pre-wrap">
              {service.description}
            </p>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What people are saying
            </h2>
            {service.steward.reviewsReceived.length > 0 ? (
              <div className="space-y-6">
                {service.steward.reviewsReceived.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-lg text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
