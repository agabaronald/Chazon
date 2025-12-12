"use client"

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Clock3, User, Settings, BookOpen, Star } from 'lucide-react'
import { useAuthStore } from '@/store/auth'
import { useBookingsStore } from '@/store/bookings'

function useUserData() {
  const { isAuthenticated, user } = useAuthStore()
  const { bookings } = useBookingsStore()
  return { isAuthenticated, user, bookings: bookings.slice(0, 3), isSteward: !!user?.isSteward }
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'CONFIRMED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Confirmed
        </span>
      )
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </span>
      )
    case 'CANCELLED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Cancelled
        </span>
      )
    case 'PENDING':
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock3 className="h-3 w-3 mr-1" />
          Pending
        </span>
      )
  }
}

export default function DashboardPage() {
  const { isAuthenticated, user, bookings, isSteward } = useUserData()
  if (!isAuthenticated || !user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back, {user.name}! Here's an overview of your account.
              </p>
            </div>
            {isSteward && (
              <Link href="/dashboard/services/create">
                <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-chazon-primary text-primary-foreground hover:bg-chazon-primary/90 h-10 px-4 py-2 text-white shadow-sm">
                  + Add Service
                </div>
              </Link>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <User className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Profile</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{isSteward ? 'Steward' : 'Customer'}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/profile" className="font-medium text-chazon-primary hover:text-chazon-primary-dark">
                    View profile
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Bookings</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{bookings.length} Recent</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/bookings" className="font-medium text-chazon-primary hover:text-chazon-primary-dark">
                    View all bookings
                  </Link>
                </div>
              </div>
            </div>

            {isSteward && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Star className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Rating</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {user.rating?.toFixed(1) || 'New'}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <Link href="/profile" className="font-medium text-chazon-primary hover:text-chazon-primary-dark">
                      View reviews
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Account</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">Settings</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <Link href="/settings" className="font-medium text-chazon-primary hover:text-chazon-primary-dark">
                    Manage account
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Your most recent service bookings.</p>
              </div>
              <Link
                href="/bookings"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-chazon-primary bg-chazon-primary-light hover:bg-chazon-primary-light/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
              >
                View All
              </Link>
            </div>

            {bookings.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {bookings.map((booking) => {
                  // Format date for display
                  const formattedDate = new Date(booking.scheduledDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })

                  return (
                    <li key={booking.id}>
                      <Link href={`/booking/confirmation/${booking.id}`}>
                        <div className="block hover:bg-gray-50">
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-200 overflow-hidden">
                                  {booking.service.images && booking.service.images.length > 0 ? (
                                    <Image
                                      src={booking.service.images[0]}
                                      alt={booking.service.title}
                                      width={40}
                                      height={40}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                                      No Image
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-chazon-primary">
                                    {booking.service.title}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {booking.service.category.name}
                                  </div>
                                </div>
                              </div>
                              <div className="ml-2 flex-shrink-0 flex">
                                {getStatusBadge(booking.status)}
                              </div>
                            </div>
                            <div className="mt-4 sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {formattedDate}
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                  <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  {booking.scheduledTime}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">You don't have any bookings yet.</p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-chazon-primary hover:bg-chazon-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
                >
                  Browse Services
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Common tasks you might want to perform.</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-chazon-primary hover:bg-chazon-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
                >
                  Browse Services
                </Link>
                {isSteward ? (
                  <Link
                    href="/dashboard/services/new"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-chazon-primary hover:bg-chazon-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
                  >
                    Add New Service
                  </Link>
                ) : (
                  <Link
                    href="/become-steward"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-chazon-primary hover:bg-chazon-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
                  >
                    Become a Steward
                  </Link>
                )}
                <Link
                  href="/settings"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
                >
                  Account Settings
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
