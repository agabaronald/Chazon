import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await req.json()
    const { serviceId, scheduledDate, scheduledTime, address, notes } = body

    if (!serviceId || !scheduledDate || !scheduledTime || !address) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    })

    if (!service) {
      return new NextResponse('Service not found', { status: 404 })
    }

    const newBooking = await prisma.booking.create({
      data: {
        clientId: session.user.id,
        stewardId: service.stewardId,
        serviceId: service.id,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        address,
        notes,
        totalPrice: service.price,
        duration: service.duration,
        status: 'PENDING',
      },
    })

    return NextResponse.json(newBooking)
  } catch (error) {
    console.error('[BOOKINGS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
