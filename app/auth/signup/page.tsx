'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/auth'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Loader2, ArrowRight, Check } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setIsLoading(true)
    setError('')

    try {
      login(email, name)
      // Simulate network delay for effect
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/services')
    } catch (err) {
      setError((err as Error).message || 'An error occurred during sign up')
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

            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
            <p className="text-gray-600 mb-8">
              Join Chazon today and start connecting with skilled professionals.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  placeholder="John Mugisha"
                />
              </div>

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
                  placeholder="john.mugisha@example.com"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center">
                  <Check className="w-3 h-3 text-transparent" />
                </div>
                <span>I agree to the <Link href="/terms" className="text-chazon-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-chazon-primary hover:underline">Privacy Policy</Link></span>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-chazon-primary hover:bg-chazon-primary-dark shadow-lg shadow-chazon-primary/25 rounded-xl mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/auth/signin" className="font-semibold text-chazon-primary hover:text-chazon-primary-dark">
                  Sign in
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
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Team collaboration"
            fill
            className="object-cover mix-blend-overlay opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chazon-primary-dark/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-20 text-white">
            <h2 className="text-4xl font-bold mb-6">Join the Community</h2>
            <p className="text-xl text-white/90 max-w-md leading-relaxed">
              Connect with thousands of skilled professionals and get things done faster, better, and together.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
