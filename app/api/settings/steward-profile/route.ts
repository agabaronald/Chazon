import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Steward profile updated successfully',
    stewardProfile: {
      id: 'mock-steward-id',
      skills: ['Cleaning', 'Gardening'],
      experience: 'Mock experience',
      availability: 'Weekdays',
      hourlyRate: 25
    },
    redirect: '/settings'
  })
}
