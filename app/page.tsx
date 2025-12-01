import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Hero } from '@/components/home/hero'
import { Categories } from '@/components/home/categories'
import { HowItWorks } from '@/components/home/how-it-works'
import { FeaturedStewards } from '@/components/home/featured-stewards'
import { Testimonials } from '@/components/home/testimonials'
import { Footer } from '@/components/layout/footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { categories as mockCategories } from '@/data/categories'
import { services } from '@/data/services'
import type { CategoryWithCount } from '@/components/home/categories'

export default async function HomePage() {
  const categories: CategoryWithCount[] = mockCategories.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description ?? null,
    slug: c.slug,
    icon: null,
    _count: { services: services.filter((s) => s.category.id === c.id).length },
  }))

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Categories categories={categories} />
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
