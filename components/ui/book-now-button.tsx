'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface BookNowButtonProps {
  serviceId: string
}

export function BookNowButton({ serviceId }: BookNowButtonProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleBooking = async () => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          // For demonstration, we'll use a placeholder date and address.
          // In a real app, you'd collect this from the user.
          scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          scheduledTime: '10:00 AM',
          address: '123 Main St, Anytown, USA',
          notes: 'Please ring the doorbell upon arrival.',
        }),
      })

      if (response.ok) {
        const booking = await response.json()
        // Redirect to the confirmation page
        router.push(`/booking/confirmation/${booking.id}`)
      } else {
        const error = await response.text()
        alert(`Booking failed: ${error}`)
      }
    } catch (error) {
      console.error('Booking request failed:', error)
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      size="lg"
      className="w-full mb-6"
      onClick={handleBooking}
      disabled={isLoading || status === 'loading'}
    >
      {isLoading ? 'Processing...' : 'Book Now'}
    </Button>
  )
}
