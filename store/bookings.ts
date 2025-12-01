import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Booking } from '@/types/booking'
import { services } from '@/data/services'

type BookingsState = {
  bookings: Booking[]
  createBooking: (params: {
    serviceId: string
    scheduledDate: Date
    scheduledTime: string
    address: string
    notes?: string
  }) => string
}

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: [],
      createBooking: ({ serviceId, scheduledDate, scheduledTime, address, notes }) => {
        const service = services.find(s => s.id === serviceId)
        const id = `bkg-${Math.random().toString(36).slice(2, 10)}`
        const booking: Booking = {
          id,
          service: service!,
          scheduledDate: scheduledDate.toISOString(),
          scheduledTime,
          address,
          notes,
          status: 'CONFIRMED',
        }
        set({ bookings: [booking, ...get().bookings] })
        return id
      },
    }),
    { name: 'bookings-store' }
  )
)
