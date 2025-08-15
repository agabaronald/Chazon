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
    const bio = formData.get('bio') as string
    const skills = formData.getAll('skills') as string[]
    const experience = formData.get('experience') as string
    const availability = formData.get('availability') as string
    const serviceArea = parseInt(formData.get('serviceArea') as string)
    const hourlyRate = parseFloat(formData.get('hourlyRate') as string)

    // Validate required fields
    if (!bio || !experience || !availability) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // Get user with steward profile
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { stewardProfile: true },
    })

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    if (!user.stewardProfile) {
      return new NextResponse('Steward profile not found', { status: 404 })
    }

    // Update steward profile
    const updatedStewardProfile = await prisma.stewardProfile.update({
      where: { id: user.stewardProfile.id },
      data: {
        bio,
        skills,
        experience,
        availability,
        serviceArea,
        hourlyRate: hourlyRate || user.stewardProfile.hourlyRate,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Steward profile updated successfully',
      stewardProfile: updatedStewardProfile,
      redirect: '/settings'
    })
  } catch (error) {
    console.error('[SETTINGS_STEWARD_PROFILE_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}