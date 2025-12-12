import { NextResponse } from 'next/server'
import { services } from '@/data/services'
import { mockBookingsStore } from '@/lib/mock-db'

export async function GET(req: Request) {
  return NextResponse.json({
    success: true,
    data: mockBookingsStore,
    meta: {
      pagination: {
        page: 1,
        total: mockBookingsStore.length,
      },
    },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate required fields
    if (!body.serviceId || !body.scheduledDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const service = services.find(s => s.id === body.serviceId)
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      )
    }

    const newBooking = {
      id: `bk-${Date.now()}`,
      status: 'CONFIRMED', // Default to confirmed for demo
      createdAt: new Date().toISOString(),
      service, // Include full service details
      ...body,
    }

    mockBookingsStore.unshift(newBooking as any) // Add to beginning

    return NextResponse.json({
      success: true,
      data: newBooking,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
