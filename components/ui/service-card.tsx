'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Service as ServiceCardType } from '@/types/service'

interface ServiceCardProps {
  service: ServiceCardType
  highlight?: string
}

function Highlight({ text, query }: { text: string; query?: string }) {
  if (!query || !text.toLowerCase().includes(query.toLowerCase())) return <>{text}</>
  const q = query.toLowerCase()
  const parts = text.split(new RegExp(`(${query})`, 'ig'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q ? (
          <span key={i} className="bg-yellow-200">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

export function ServiceCard({ service, highlight }: ServiceCardProps) {
  const { steward } = service

  return (
    <Link href={`/service/${service.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <CardHeader className="p-0">
          <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
            <Image
              src={service.images[0] || '/placeholder-image.jpg'}
              alt={service.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <Badge variant="secondary" className="mb-2 capitalize">
            {service.category.name}
          </Badge>
          <CardTitle className="text-xl font-bold text-gray-900 leading-tight mb-4">
            <Highlight text={service.title} query={highlight} />
          </CardTitle>
        </CardContent>
        <CardFooter className="p-6 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={steward.image || '/default-avatar.png'}
              alt={steward.name || 'Steward'}
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800">{steward.name}</p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="font-semibold">
                  {steward.rating?.toFixed(1) || 'New'}
                </span>
                <span className="ml-1">({steward.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-green-600">
              ${service.price.toFixed(2)}
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
