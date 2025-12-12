'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { User } from '@/types/user'

export function AuthSync() {
  const { data: session, status } = useSession()
  const { login, logout, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Cast session user to any to access custom properties like role
      const sessionUser = session.user as any
      
      const user: User = {
        id: sessionUser.id,
        name: sessionUser.name || '',
        email: sessionUser.email || '',
        image: sessionUser.image || undefined,
        // Map role to isSteward
        isSteward: sessionUser.role === 'STEWARD',
      }
      
      login(user)
    } else if (status === 'unauthenticated' && isAuthenticated) {
      logout()
    }
  }, [session, status, login, logout, isAuthenticated])

  return null
}
