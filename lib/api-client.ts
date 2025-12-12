import { Service, Category } from '@/types/service'
import { Booking } from '@/types/booking'
import { User } from '@/types/user'

const API_BASE_URL = typeof window === 'undefined' 
  ? (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') + '/api'
  : '/api'

export type ApiResponse<T> = {
  success: boolean
  data: T
  meta?: {
    pagination?: {
      page: number
      total: number
    }
  }
  error?: string
}

export class ApiClient {
  private static async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await this.fetchRaw<T>(endpoint, options)
    return response.data
  }

  private static async fetchRaw<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred')
    }

    return data
  }

  static services = {
    list: async (params?: URLSearchParams) => {
      const queryString = params ? `?${params.toString()}` : ''
      return ApiClient.fetchRaw<Service[]>(`/services${queryString}`)
    },
    get: async (id: string) => {
      return ApiClient.fetch<Service>(`/services/${id}`)
    },
  }

  static categories = {
    list: async () => {
      return ApiClient.fetch<Category[]>('/categories')
    },
  }

  static bookings = {
    list: async () => {
      return ApiClient.fetch<Booking[]>('/bookings')
    },
    get: async (id: string) => {
      return ApiClient.fetch<Booking>(`/bookings/${id}`)
    },
    create: async (bookingData: Partial<Booking>) => {
      return ApiClient.fetch<Booking>('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      })
    },
    updateStatus: async (id: string, status: string) => {
      return ApiClient.fetch<Booking>(`/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      })
    },
  }

  static auth = {
    signup: async (userData: Partial<User> & { password: string }) => {
      return ApiClient.fetch<User>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      })
    },
    signin: async (credentials: { email: string; password: string }) => {
      return ApiClient.fetch<User>('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
      })
    },
  }
}
