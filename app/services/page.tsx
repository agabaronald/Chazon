import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ServiceCard } from '@/components/ui/service-card'
import { ServiceFilterSidebar } from '@/components/ui/service-filter-sidebar'
import { services as allServices } from '@/data/services'
import { categories as allCategories } from '@/data/categories'
import { Pagination } from '@/components/ui/pagination'
import { FilterChips } from '@/components/ui/filter-chips'

// This function fetches the services and its return type will be used to infer the service type
async function getServices(filters: { category?: string; price?: string; sortBy?: string; page?: number; pageSize?: number }) {
  const { category, price, sortBy } = filters
  const [sortField, sortOrder] = sortBy?.split(':') || ['price', 'desc']
  let filtered = allServices
  if (category) filtered = filtered.filter(s => s.category.slug === category)
  if (price) filtered = filtered.filter(s => s.price <= parseInt(price))
  filtered = [...filtered].sort((a, b) => {
    const dir = sortOrder === 'asc' ? 1 : -1
    if (sortField === 'price') return (a.price - b.price) * dir
    return dir
  })
  const page = filters.page && filters.page > 0 ? filters.page : 1
  const pageSize = filters.pageSize && filters.pageSize > 0 ? filters.pageSize : 9
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)
  return { items, total: filtered.length, page, pageSize }
}

// Infer the service type from the actual data being fetched
import type { Service as ServiceCardType } from '@/types/service'

interface ServicesPageProps {
  params: Promise<Record<string, string>>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

async function getCategories() {
  return allCategories
}

export default async function ServicesPage({ params, searchParams }: ServicesPageProps) {
  // We don't use params in this page, but it's required by Next.js 15
  await params
  const resolvedSearchParams = await searchParams
  const filters = {
    category: resolvedSearchParams.category as string,
    price: resolvedSearchParams.price as string,
    sortBy: resolvedSearchParams.sortBy as string,
    page: resolvedSearchParams.page ? parseInt(resolvedSearchParams.page as string) : 1,
    pageSize: resolvedSearchParams.pageSize ? parseInt(resolvedSearchParams.pageSize as string) : 9,
  }

  const { items, total, page, pageSize } = await getServices(filters)
  const categories = await getCategories()
  const currentCategory = categories.find(c => c.slug === filters.category)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ServiceFilterSidebar categories={categories} />
            </div>
            <div className="lg:col-span-3">
              <FilterChips />
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {currentCategory ? `${currentCategory.name} Services` : 'All Services'}
                </h1>
                <p className="text-xl text-gray-600">
                  {currentCategory
                    ? `Explore services in the ${currentCategory.name} category.`
                    : 'Find the perfect steward for any task.'}
                </p>
              </div>

              {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {items.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-500">
                    No services found with the current filters.
                  </p>
                </div>
              )}

              <Pagination total={total} page={page} pageSize={pageSize} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
