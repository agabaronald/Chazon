import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { currentPassword, newPassword } = await req.json()

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json({
        success: false,
        message: 'Current password and new password are required',
      }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({
        success: false,
        message: 'New password must be at least 8 characters long',
      }, { status: 400 })
    }

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        password: true,
      },
    })

    if (!user || !user.password) {
      return NextResponse.json({
        success: false,
        message: 'User not found or no password set',
      }, { status: 404 })
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'Current password is incorrect',
      }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully',
    })
  } catch (error) {
    console.error('[CHANGE_PASSWORD_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}