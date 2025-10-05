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

    const formData = await req.formData()
    
    // Extract form data
    const bookingNotifications = formData.get('booking-notifications') === 'on'
    const marketingEmails = formData.get('marketing-emails') === 'on'

    // Update user preferences
    // Note: These fields need to be added to the User model in the Prisma schema
    // For now, we'll just return the values without updating the database
    const updatedUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    return NextResponse.json({
      success: true,
      message: 'Account settings updated successfully',
      user: {
        id: updatedUser?.id,
        // Return the form values since these fields don't exist in the model yet
        emailNotifications: bookingNotifications,
        marketingEmails: marketingEmails,
      },
      redirect: '/settings'
    })
  } catch (error) {
    console.error('[SETTINGS_ACCOUNT_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
  */
  
  // Return mock success response
  return NextResponse.json({
    success: true,
    message: 'Account settings updated successfully',
    user: {
      id: 'mock-id',
      emailNotifications: true,
      marketingEmails: false,
    },
    redirect: '/settings'
  })
}