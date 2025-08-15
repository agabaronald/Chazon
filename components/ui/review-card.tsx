'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Prisma } from '@prisma/client'

// Use a Prisma-generated type for the review, including the reviewer's details.
export type ReviewWithReviewer = Prisma.ReviewGetPayload<{
  include: {
    reviewer: { select: { name: true; image: true } }
  }
}>

interface ReviewCardProps {
  review: ReviewWithReviewer
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="bg-gray-50/50 border-gray-200">
      <CardHeader className="flex-row items-center gap-4">
        <Image
          src={review.reviewer.image || '/default-avatar.png'}
          alt={review.reviewer.name || 'Reviewer'}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {review.reviewer.name}
          </CardTitle>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {review.comment && (
          <p className="text-gray-800 italic">{`"${review.comment}"`}</p>
        )}
        <p className="text-sm text-gray-500 mt-2 text-right">
          {new Date(review.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </CardContent>
    </Card>
  )
}
