'use client'

import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

const popularServices = [
  'Furniture Assembly',
  'TV Mounting',
  'Moving Help',
  'Cleaning',
  'Handyman',
  'Delivery'
]

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handlePopularServiceClick = (service: string) => {
    window.location.href = `/search?q=${encodeURIComponent(service)}`
  } // ✅ This closing brace was missing

  return (
    <section className="relative bg-gradient-to-br from-chazon-primary to-chazon-blue hero-pattern bg-blue-400">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Everyday life made easier
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Get help with everyday tasks from trusted, skilled Stewards in your area.
              Same-day service available.
            </p>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <Image
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMG1lZXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
              alt="Task being done"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl mx-auto"
              priority
            />
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mt-12 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
              <Input
                type="text"
                placeholder="What do you need help with?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-0 rounded-xl shadow-lg focus:ring-2 focus:ring-white/50"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-white text-chazon-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </div>

        {/* Popular Services */}
        <div className="max-w-4xl mx-auto">
          <p className="text-white/80 mb-4 text-lg">Popular services:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularServices.map((service) => (
              <button
                key={service}
                onClick={() => handlePopularServiceClick(service)}
                className="bg-white/25 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/35 transition-all duration-200 border border-white/30 hover:border-white/50"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5000+</div>
              <div className="text-white/80">Trusted Stewards</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Tasks Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10+</div>
              <div className="text-white/80">Cities Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
