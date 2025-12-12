import { NextRequest, NextResponse } from 'next/server'
import { mockBookingsStore } from '@/lib/mock-db'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const booking = mockBookingsStore.find((b) => b.id === id)

  if (!booking) {
    return NextResponse.json(
      { success: false, error: 'Booking not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: booking,
  })
}
