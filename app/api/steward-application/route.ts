import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await req.formData()
    
    // Extract form data
    const skills = formData.getAll('skills') as string[]
    const experience = formData.get('experience') as string
    const availability = formData.get('availability') as string
    // Note: serviceArea field doesn't exist in the model, so we'll skip it
    const bio = formData.get('bio') as string
    const termsAccepted = formData.get('terms') === 'on'
    const backgroundCheckConsent = formData.get('backgroundCheck') === 'on'

    // Validate required fields
    if (!skills.length || !experience || !availability || !bio) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    if (!termsAccepted || !backgroundCheckConsent) {
      return new NextResponse('You must accept the terms and consent to a background check', { status: 400 })
    }

    // Check if user already exists
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { stewardProfile: true },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    if (user.stewardProfile) {
      return new NextResponse('You are already a steward', { status: 400 })
    }

    // Update user bio
    await prisma.user.update({
      where: { id: user.id },
      data: {
        bio,
        isSteward: true, // Mark user as steward
      },
    })

    // Create steward profile
    const stewardProfile = await prisma.stewardProfile.create({
      data: {
        userId: user.id,
        skills,
        experience,
        availability,
        hourlyRate: 0, // Default hourly rate
      },
    })

    // Redirect to confirmation page
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      stewardProfile,
      redirect: '/become-steward/confirmation'
    })
  } catch (error) {
    console.error('[STEWARD_APPLICATION_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}