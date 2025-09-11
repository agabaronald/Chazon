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
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const location = formData.get('address') as string // Form field is 'address' but DB field is 'location'

    // Validate required fields
    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phone,
        location, // Using location field instead of address
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.location, // Map location back to address for the frontend
      },
      redirect: '/settings'
    })
  } catch (error) {
    console.error('[SETTINGS_PROFILE_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}