import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'
import { mockUser } from '@/data/users'

type AuthState = {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, name?: string) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, name) => {
        const user: User = { ...mockUser, email, name: name || mockUser.name }
        set({ isAuthenticated: true, user })
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : state.user })),
    }),
    { name: 'auth-store' }
  )
)
