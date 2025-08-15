import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        stewardProfile: true,
        bookings: true,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    // Check if user has active bookings
    const hasActiveBookings = user.bookings.some(
      booking => booking.status === 'CONFIRMED' || booking.status === 'PENDING'
    )

    if (hasActiveBookings) {
      return NextResponse.json({
        success: false,
        message: 'Cannot delete account with active bookings. Please cancel all active bookings first.',
      }, { status: 400 })
    }

    // Delete steward profile if exists
    if (user.stewardProfile) {
      await prisma.stewardProfile.delete({
        where: { id: user.stewardProfile.id },
      })
    }

    // Delete user's bookings
    await prisma.booking.deleteMany({
      where: { userId: user.id },
    })

    // Delete user
    await prisma.user.delete({
      where: { id: user.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Account deleted successfully',
      redirect: '/',
    })
  } catch (error) {
    console.error('[DELETE_ACCOUNT_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}