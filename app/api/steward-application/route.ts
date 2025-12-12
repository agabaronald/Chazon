import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.json()
    const { 
      skills, 
      experience, 
      availability, 
      bio,
      phone,
      address,
      city,
      languages,
      yearsOfExperience,
      profilePicture,
      documentType,
      nationalIdFront,
      nationalIdBack,
      passportImage,
      recommendationLetter
    } = formData

    // Basic validation
    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json({ error: 'At least one skill is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if profile already exists
    const existingProfile = await prisma.stewardProfile.findUnique({
      where: { userId: user.id },
    })

    if (existingProfile) {
      return NextResponse.json({ 
        success: true, 
        message: 'Profile already exists',
        redirect: '/dashboard' 
      })
    }

    // Upload Helper
    const uploadImage = async (file: string | null | undefined, folder: string) => {
      if (file && file.startsWith('data:')) {
        return await uploadToCloudinary(file, folder)
      }
      return null
    }

    // Upload Files
    let profilePicUrl = null
    let frontDocUrl = null
    let backDocUrl = null
    let recLetterUrl = null

    try {
      // Profile Picture
      profilePicUrl = await uploadImage(profilePicture, 'chazon/profiles')
      
      // Recommendation Letter
      recLetterUrl = await uploadImage(recommendationLetter, 'chazon/docs')

      // KYC Documents
      if (documentType === 'NATIONAL_ID') {
        frontDocUrl = await uploadImage(nationalIdFront, 'chazon/kyc')
        backDocUrl = await uploadImage(nationalIdBack, 'chazon/kyc')
      } else if (documentType === 'PASSPORT') {
        frontDocUrl = await uploadImage(passportImage, 'chazon/kyc')
      }
    } catch (uploadError) {
      console.error('Upload failed:', uploadError)
      return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 })
    }

    // Create Steward Profile and Update User Role
    await prisma.$transaction([
      prisma.stewardProfile.create({
        data: {
          userId: user.id,
          bio: bio || experience,
          skills: skills,
          languages: languages || [],
          yearsOfExperience: parseInt(yearsOfExperience) || 0,
          
          // KYC Data
          verificationDocumentType: documentType,
          verificationDocumentFront: frontDocUrl,
          verificationDocumentBack: backDocUrl,
          recommendationLetter: recLetterUrl,
          backgroundCheckStatus: frontDocUrl ? 'PENDING' : 'PENDING',
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { 
          role: 'STEWARD',
          phone: phone,
          address: address,
          city: city,
          image: profilePicUrl || user.image, // Update profile pic if provided
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      redirect: '/become-steward/confirmation',
    })
  } catch (error) {
    console.error('Steward application error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
