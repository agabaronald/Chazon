'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useBookingsStore } from '@/store/bookings'
import { useAuthStore } from '@/store/auth'

type BookingStepsProps = { serviceId: string }

export function BookingSteps({ serviceId }: BookingStepsProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { createBooking } = useBookingsStore()
  const [step, setStep] = useState(1)
  const [scheduledDate, setScheduledDate] = useState<string>('')
  const [scheduledTime, setScheduledTime] = useState<string>('10:00')
  const [address, setAddress] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const next = () => setStep((s) => Math.min(s + 1, 3))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const submit = async () => {
    if (!isAuthenticated) {
      router.push('/auth/signin')
      return
    }
    if (!scheduledDate || !address) return
    setIsSubmitting(true)
    try {
      const id = await createBooking({
        serviceId,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        address,
        notes,
      })
      router.push(`/booking/confirmation/${id}`)
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Step {step} of 3</div>
      </div>

      {step === 1 && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <Input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <Input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <Input type="text" placeholder="123 Main St, City" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <Input type="text" placeholder="Any instructions for the steward" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={back} disabled={step === 1 || isSubmitting}>Back</Button>
        {step < 3 ? (
          <Button onClick={next} disabled={isSubmitting}>Next</Button>
        ) : (
          <Button onClick={submit} disabled={isSubmitting || !scheduledDate || !address} className="bg-chazon-primary hover:bg-chazon-primary-dark">Confirm Booking</Button>
        )}
      </div>
    </div>
  )
}

