import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const skills = formData.getAll('skills') as string[]
  const experience = (formData.get('experience') as string) || ''
  const availability = (formData.get('availability') as string) || ''
  const bio = (formData.get('bio') as string) || ''
  const termsAccepted = formData.get('terms') === 'on'
  const backgroundCheckConsent = formData.get('backgroundCheck') === 'on'

  if (!skills.length || !experience || !availability || !bio) {
    return new NextResponse('Missing required fields', { status: 400 })
  }
  if (!termsAccepted || !backgroundCheckConsent) {
    return new NextResponse('You must accept the terms and consent to a background check', { status: 400 })
  }

  return NextResponse.json({
    success: true,
    message: 'Application submitted successfully',
    stewardProfile: {
      id: 'mock-steward-id',
      skills,
      experience,
      availability,
      hourlyRate: 0,
    },
    redirect: '/become-steward/confirmation',
  })
}
