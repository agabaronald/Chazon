import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  /* Backend function commented out to keep only frontend working
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Return success response
    return NextResponse.json(
      { message: 'User created successfully', user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
  */
  
  // Return mock success response
  return NextResponse.json(
    { message: 'User created successfully', user: { id: 'mock-id', name: 'Mock User', email: 'mock@example.com' } },
    { status: 201 }
  )
}
