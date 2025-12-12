export type Category = {
  id: string
  name: string
  slug: string
  description?: string
}

export type Steward = {
  id: string
  name: string
  image?: string
  rating?: number
  totalReviews?: number
  bio?: string
}

export type Service = {
  id: string
  title: string
  description: string
  price: number
  currency?: string
  duration: number
  images: string[]
  category: Category
  steward: Steward
}

