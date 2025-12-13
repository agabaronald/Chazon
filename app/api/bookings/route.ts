import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Helper to map Task to Booking
const mapTaskToBooking = (task: any) => ({
  id: task.id,
  status: mapStatus(task.status),
  scheduledDate: task.scheduledStart.toISOString(),
  scheduledTime: task.scheduledStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  address: task.address,
  notes: task.description,
  service: {
    id: task.id, // We don't have the original service ID in Task, using Task ID or leaving ambiguous
    title: task.category,
    description: task.description || "",
    price: task.agreedPrice,
    currency: task.currency,
    duration: 60, // Default
    images: task.steward.image ? [task.steward.image] : [],
    category: { 
      id: task.category.toLowerCase(), 
      name: task.category, 
      slug: task.category.toLowerCase() 
    },
    steward: {
      id: task.steward.id,
      name: task.steward.name,
      image: task.steward.image,
      rating: 0, // Placeholder
    }
  }
})

const mapStatus = (status: string) => {
  switch (status) {
    case 'OPEN': return 'PENDING'
    case 'ASSIGNED': return 'CONFIRMED'
    case 'IN_PROGRESS': return 'IN_PROGRESS'
    case 'DONE': return 'COMPLETED'
    case 'CANCELLED': return 'CANCELLED'
    default: return 'PENDING'
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const tasks = await prisma.task.findMany({
      where: {
        clientId: session.user.id
      },
      include: {
        steward: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: tasks.map(mapTaskToBooking),
      meta: {
        pagination: {
          page: 1,
          total: tasks.length,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    
    // Validate required fields
    if (!body.serviceId || !body.scheduledDate) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find the service offering to get details
    const serviceOffering = await prisma.serviceOffering.findUnique({
      where: { id: body.serviceId },
      include: { steward: { include: { user: true } } } // Assuming StewardProfile links to User
    })

    // If serviceOffering not found (maybe it's a mock ID?), we can't create a real Task easily.
    // But for now, let's assume we need real services.
    // If the user is testing with seed data, it should work.
    
    // Note: Schema for StewardProfile:
    // model StewardProfile { ... user User @relation ... }
    
    if (!serviceOffering) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      )
    }

    const task = await prisma.task.create({
      data: {
        clientId: session.user.id,
        stewardId: serviceOffering.steward.userId, // Assuming StewardProfile has userId
        category: serviceOffering.category,
        description: body.notes || serviceOffering.title,
        address: body.address,
        agreedPrice: serviceOffering.price,
        currency: serviceOffering.currency,
        pricingType: serviceOffering.pricingType,
        scheduledStart: new Date(body.scheduledDate), // Should combine with time
        status: 'OPEN',
      },
      include: {
        steward: true
      }
    })

    return NextResponse.json({
      success: true,
      data: mapTaskToBooking(task),
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
