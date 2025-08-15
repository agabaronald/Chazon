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

    const formData = await req.formData()
    
    // Extract form data
    const bookingNotifications = formData.get('booking-notifications') === 'on'
    const marketingEmails = formData.get('marketing-emails') === 'on'

    // Update user preferences
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        emailNotifications: bookingNotifications,
        marketingEmails: marketingEmails,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Account settings updated successfully',
      user: {
        id: updatedUser.id,
        emailNotifications: updatedUser.emailNotifications,
        marketingEmails: updatedUser.marketingEmails,
      },
      redirect: '/settings'
    })
  } catch (error) {
    console.error('[SETTINGS_ACCOUNT_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}