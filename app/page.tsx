import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Hero } from '@/components/home/hero'
import { Categories } from '@/components/home/categories'
import { FeaturedServices } from '@/components/home/featured-services'
import { HowItWorks } from '@/components/home/how-it-works'
import { FeaturedStewards } from '@/components/home/featured-stewards'
import { Testimonials } from '@/components/home/testimonials'
import { Footer } from '@/components/layout/footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import type { CategoryWithCount } from '@/components/home/categories'
import { ApiClient } from '@/lib/api-client'

import { Service, Category } from '@/types/service'

export default async function HomePage() {
  let categoriesData: Category[] = []
  let servicesData: Service[] = []

  try {
    const [categoriesResponse, servicesResponse] = await Promise.all([
      ApiClient.categories.list(),
      ApiClient.services.list()
    ])
    categoriesData = categoriesResponse
    servicesData = servicesResponse.data
  } catch (error) {
    console.error('Failed to fetch home page data:', error)
  }

  const categories: CategoryWithCount[] = categoriesData.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description ?? null,
    slug: c.slug,
    icon: null,
    _count: { services: servicesData.filter((s) => s.category.id === c.id).length },
  }))

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Categories categories={categories} />
        <FeaturedServices services={servicesData} categories={categoriesData} />
        <HowItWorks />
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedStewards />
        </Suspense>
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
