import type { Service } from './service'

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export type Booking = {
  id: string
  service: Service
  scheduledDate: string
  scheduledTime: string
  address: string
  notes?: string
  status: BookingStatus
}

