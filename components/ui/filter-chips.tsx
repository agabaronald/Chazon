'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Chip = { label: string; set: (params: URLSearchParams) => void }

const priceChips: Chip[] = [
  { label: 'Under $50', set: (p) => p.set('price', '50') },
  { label: 'Under $100', set: (p) => p.set('price', '100') },
  { label: 'Under $200', set: (p) => p.set('price', '200') },
]

export function FilterChips() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const applyChip = (chip: Chip) => {
    const params = new URLSearchParams(searchParams)
    chip.set(params)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {priceChips.map((chip) => (
        <button
          key={chip.label}
          onClick={() => applyChip(chip)}
          className="px-3 py-1 rounded-full text-sm border border-gray-300 hover:border-chazon-primary hover:text-chazon-primary"
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}

