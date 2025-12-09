'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, ArrowRight } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      login(email)
      // Simulate network delay for effect
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/services')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-chazon-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CH</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Chazon</span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600 mb-8">
              Please enter your details to sign in.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-chazon-primary focus:ring-chazon-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-chazon-primary hover:text-chazon-primary-dark"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-chazon-primary hover:bg-chazon-primary-dark shadow-lg shadow-chazon-primary/25 rounded-xl mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="font-semibold text-chazon-primary hover:text-chazon-primary-dark">
                  Sign up for free
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Image/Banner */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-chazon-primary">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
            alt="Office workspace"
            fill
            className="object-cover mix-blend-overlay opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chazon-primary-dark/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-20 text-white">
            <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
            <p className="text-xl text-white/90 max-w-md leading-relaxed">
              Log in to access your dashboard, manage your services, and connect with stewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
