"use client"

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { notFound, useParams } from 'next/navigation'
import { CheckCircle, Calendar, MapPin, Clock, FileText } from 'lucide-react'
import { ImageWithFallback } from '@/components/ui/image-with-fallback'
import Link from 'next/link'
import { ApiClient } from '@/lib/api-client'
import { Booking } from '@/types/booking'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function BookingConfirmationPage() {
  const { id } = useParams() as { id: string }
  const [booking, setBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBooking() {
      try {
        const data = await ApiClient.bookings.get(id)
        setBooking(data)
      } catch (err) {
        console.error('Failed to fetch booking:', err)
        setError('Failed to load booking details')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchBooking()
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
             <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h1>
             <p className="text-gray-600 mb-6">The booking you are looking for does not exist or could not be loaded.</p>
             <Link href="/bookings" className="text-chazon-primary hover:underline">Return to My Bookings</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formattedDate = new Date(booking.scheduledDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Confirmation Header */}
            <div className="bg-chazon-primary p-6 text-white text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16" />
              </div>
              <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
              <p className="text-lg mt-2">Your service has been successfully booked</p>
            </div>

            {/* Booking Details */}
            <div className="p-6">
              <div className="border-b pb-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-chazon-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium text-gray-900">{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-chazon-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium text-gray-900">{booking.scheduledTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-chazon-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium text-gray-900">{booking.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-chazon-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="font-medium text-gray-900">{booking.notes || 'No notes provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service Details</h2>
                <div className="flex items-start space-x-4">
                  <div className="h-16 w-16 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden">
                    {booking.service.images && booking.service.images.length > 0 ? (
                      <ImageWithFallback
                        src={booking.service.images[0]}
                        alt={booking.service.title}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{booking.service.title}</h3>
                    <p className="text-sm text-gray-500">{booking.service.category.name}</p>
                    <p className="text-chazon-primary font-semibold mt-1">
                      ${booking.service.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Steward Details */}
              <div className="border-b pb-6 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Steward Details</h2>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                    {booking.service.steward.image ? (
                      <ImageWithFallback
                        src={booking.service.steward.image}
                        alt={booking.service.steward.name || 'Steward'}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                        {booking.service.steward.name?.charAt(0) || 'S'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{booking.service.steward.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600 ml-1">
                          {booking.service.steward.rating?.toFixed(1) || 'New'} ({booking.service.steward.totalReviews || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/bookings"
                  className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
                >
                  View All Bookings
                </Link>
                <Link
                  href={`/service/${booking.service.id}`}
                  className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-chazon-primary hover:bg-chazon-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
                >
                  View Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
import Image from 'next/image'
