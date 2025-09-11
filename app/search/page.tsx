import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ServiceCard } from '@/components/ui/service-card'
import { prisma } from '@/lib/prisma'

async function searchServices(query: string) {
  try {
    // Search in title, description, and category name
    const services = await prisma.service.findMany({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { name: { contains: query, mode: 'insensitive' } } },
        ],
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
        createdAt: 'desc',
      },
    })
    return services
  } catch (error) {
    console.error('Failed to search services:', error)
    return []
  }
}

interface SearchPageProps {
  params: Promise<{}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  // We don't use params in this page, but it's required by Next.js 15
  await params
  const resolvedSearchParams = await searchParams
  const query = Array.isArray(resolvedSearchParams.q) ? resolvedSearchParams.q[0] : resolvedSearchParams.q || ''
  const services = await searchServices(query)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Search Results
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {services.length > 0
                ? `Found ${services.length} results for "${query}"`
                : `No results found for "${query}"`}
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">No services found</h2>
              <p className="text-gray-600 mb-6">
                We couldn't find any services matching your search. Try using different keywords or browse our categories.
              </p>
              <a
                href="/services"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-chazon-primary hover:bg-chazon-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-chazon-primary"
              >
                Browse All Services
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}