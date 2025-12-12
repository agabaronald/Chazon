import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock authentication - accept any password for demo, but check email format
    // In a real app, verify against DB hash
    
    const mockUser = {
      id: 'user-123',
      name: 'John Mugisha',
      email: email,
      role: 'CUSTOMER',
      isVerified: true,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: mockUser,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}
