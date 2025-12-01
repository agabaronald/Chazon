import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: 'mock-id',
      name: 'Mock User',
      email: 'mock@example.com',
      phone: '123-456-7890',
      address: 'Mock Address',
    },
    redirect: '/settings'
  })
}
