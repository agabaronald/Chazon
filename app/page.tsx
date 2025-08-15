import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Hero } from '@/components/home/hero'
import { Categories } from '@/components/home/categories'
import { HowItWorks } from '@/components/home/how-it-works'
import { FeaturedStewards } from '@/components/home/featured-stewards'
import { Testimonials } from '@/components/home/testimonials'
import { Footer } from '@/components/layout/footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  // Fetch categories directly from the database
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { services: true },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })

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