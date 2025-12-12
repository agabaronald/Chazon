import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { auth } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const sortBy = searchParams.get('sortBy')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '9')

  const where: Prisma.ServiceOfferingWhereInput = {}

  if (category && category !== 'All') {
    where.category = {
      equals: category,
      mode: 'insensitive',
    }
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (minPrice) {
    where.price = { 
      ...(where.price as Prisma.FloatFilter || {}), 
      gte: parseFloat(minPrice) 
    }
  }

  if (maxPrice) {
    where.price = { 
      ...(where.price as Prisma.FloatFilter || {}), 
      lte: parseFloat(maxPrice) 
    }
  }

  const orderBy: Prisma.ServiceOfferingOrderByWithRelationInput = {}
  if (sortBy) {
    const [field, order] = sortBy.split(':')
    if (field === 'price') {
      orderBy.price = order === 'asc' ? 'asc' : 'desc'
    }
  } else {
    orderBy.createdAt = 'desc'
  }

  try {
    const [total, offerings] = await Promise.all([
      prisma.serviceOffering.count({ where }),
      prisma.serviceOffering.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          steward: {
            include: {
              user: true,
            },
          },
        },
      }),
    ])

    const services = offerings.map((offering) => ({
      id: offering.id,
      title: offering.title,
      description: offering.description || '',
      price: offering.price,
      currency: offering.currency,
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
        totalReviews: offering.steward.completedTasks, // Using completedTasks as proxy for reviews count
        bio: offering.steward.bio,
      },
    }))

    return NextResponse.json({
      success: true,
      data: services,
      meta: {
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, category, price, duration, currency } = body

    if (!title || !category || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { stewardProfile: true },
    })

    if (!user || !user.stewardProfile) {
      return NextResponse.json({ error: 'You must be a steward to create services' }, { status: 403 })
    }

    const service = await prisma.serviceOffering.create({
      data: {
        stewardId: user.stewardProfile.id,
        title,
        description,
        category,
        price: parseFloat(price),
        currency: currency || 'UGX',
        duration: parseInt(duration) || 60,
        images: [], // TODO: Add image upload
      },
    })

    return NextResponse.json({
      success: true,
      data: service,
    })

  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
