import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  return NextResponse.json(
    { message: 'User created successfully', user: { id: 'mock-id', name: 'Mock User', email: 'mock@example.com' } },
    { status: 201 }
  )
}
