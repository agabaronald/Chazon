import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  /* Backend function commented out to keep only frontend working
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
        bookingsAsClient: true,
        bookingsAsSteward: true,
      },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    // Check if user has active bookings
    const hasActiveClientBookings = user.bookingsAsClient.some(
      booking => booking.status === 'CONFIRMED' || booking.status === 'PENDING'
    )
    
    const hasActiveStewardBookings = user.bookingsAsSteward.some(
      booking => booking.status === 'CONFIRMED' || booking.status === 'PENDING'
    )
    
    const hasActiveBookings = hasActiveClientBookings || hasActiveStewardBookings

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

    // Delete user's bookings as client
    await prisma.booking.deleteMany({
      where: { clientId: user.id },
    })
    
    // Delete user's bookings as steward
    await prisma.booking.deleteMany({
      where: { stewardId: user.id },
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
  */
  
  // Return mock success response
  return NextResponse.json({
    success: true,
    message: 'Account deleted successfully',
    redirect: '/',
  })
}