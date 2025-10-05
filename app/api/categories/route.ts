import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  /* Backend function commented out to keep only frontend working
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { services: { where: { isActive: true } } },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('[CATEGORIES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
  */
  
  // Return mock data instead
  return NextResponse.json([])
}
