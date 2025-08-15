import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ServiceCard } from '@/components/ui/service-card'
import { ServiceFilterSidebar } from '@/components/ui/service-filter-sidebar'
import { prisma } from '@/lib/prisma'

// This function fetches the services and its return type will be used to infer the service type
async function getServices(filters: { category?: string; price?: string; sortBy?: string }) {
  const { category, price, sortBy } = filters
  const [sortField, sortOrder] = sortBy?.split(':') || ['createdAt', 'desc']

  try {
    const services = await prisma.service.findMany({
      where: {
        isActive: true,
        ...(category && { category: { slug: category } }),
        ...(price && { price: { lte: parseInt(price) } }),
      },
      include: {
        category: true,
        steward: {
          select: {
            id: true,
            name: true,
            image: true,
            rating: true,
            totalReviews: true,
          },
        },
      },
      orderBy: {
        [sortField]: sortOrder,
      },
    })

    return services
  } catch (error) {
    console.error('Failed to fetch services:', error)
    return []
  }
}

// Infer the service type from the actual data being fetched
type Services = Awaited<ReturnType<typeof getServices>>
export type ServiceCardType = Services[number]

interface ServicesPageProps {
  searchParams: Record<string, string | string[] | undefined>
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ where: { isActive: true } })
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const filters = {
    category: searchParams.category as string,
    price: searchParams.price as string,
    sortBy: searchParams.sortBy as string,
  }

  const services = await getServices(filters)
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

              {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {services.map((service) => (
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}