import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const categorySlug = searchParams.get('category')
    const query = searchParams.get('q')

    const services = await prisma.service.findMany({
      where: {
        isActive: true,
        ...(categorySlug && {
          category: {
            slug: categorySlug,
          },
        }),
        ...(query && {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { name: { contains: query, mode: 'insensitive' } } },
          ],
        }),
      },
      include: {
        category: true,
        steward: {
          select: {
            id: true,
            name: true,
            image: true,
            rating: true,
            totalReviews: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('[SERVICES_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
