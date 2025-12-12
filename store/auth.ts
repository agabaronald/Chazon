import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'
import { ApiClient } from '@/lib/api-client'

type AuthState = {
  isAuthenticated: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => {
        set({ isAuthenticated: true, user })
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : state.user })),
    }),
    { name: 'auth-store' }
  )
)
