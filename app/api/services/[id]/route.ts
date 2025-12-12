import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  try {
    const offering = await prisma.serviceOffering.findUnique({
      where: { id },
      include: {
        steward: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!offering) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      )
    }

    const service = {
      id: offering.id,
      title: offering.title,
      description: offering.description || '',
      price: offering.price,
      duration: offering.duration,
      images: offering.images.length > 0 ? offering.images : ['https://images.unsplash.com/photo-1581578731117-104f8a338e2d?w=800&q=80'],
      category: {
        id: offering.category.toLowerCase(),
        name: offering.category.charAt(0).toUpperCase() + offering.category.slice(1),
        slug: offering.category.toLowerCase(),
      },
      steward: {
        id: offering.steward.id,
        name: offering.steward.user.name,
        image: offering.steward.user.image,
        rating: offering.steward.rating,
        totalReviews: offering.steward.completedTasks,
        bio: offering.steward.bio,
      },
    }

    return NextResponse.json({
      success: true,
      data: service,
    })
  } catch (error) {
    console.error('Failed to fetch service:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service' },
      { status: 500 }
    )
  }
}
