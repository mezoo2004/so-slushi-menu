import { useEffect, useRef, useState, type ComponentType } from 'react'
import { Beef, CupSoda, Drumstick, Fish, Salad, Sandwich, Soup, Utensils, type LucideProps } from 'lucide-react'
import type { Category } from '../types/menu'
import { getCategoryImage } from '../data/menu'
import { useLanguage } from '../hooks/useLanguage'
import { MenuImage } from './MenuImage'

type Props = {
  categories: Category[]
  activeId: string
  focusRequestId: string | null
  sticky?: boolean
  onSelect: (id: string) => void
}

const categoryIcons: Record<string, ComponentType<LucideProps>> = {
  'chicken-burgers': Drumstick,
  'beef-burgers': Beef,
  'ribs-steaks': Utensils,
  appetizers: Fish,
  'sides-salads': Salad,
  sliders: Sandwich,
  wraps: Sandwich,
  sauces: Soup,
  drinks: CupSoda,
}

function scrollPillHorizontally(scroller: HTMLElement, pill: HTMLElement) {
  const scrollerRect = scroller.getBoundingClientRect()
  const pillRect = pill.getBoundingClientRect()
  const delta =
    pillRect.left + pillRect.width / 2 - (scrollerRect.left + scrollerRect.width / 2)

  if (Math.abs(delta) < 2) return
  scroller.scrollBy({ left: delta, behavior: 'smooth' })
}

export function CategoryNav({
  categories,
  activeId,
  focusRequestId,
  sticky = false,
  onSelect,
}: Props) {
  const { tr } = useLanguage()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!focusRequestId) return
    const categoryId = focusRequestId.includes(':')
      ? focusRequestId.split(':')[0]
      : focusRequestId
    const scroller = scrollerRef.current
    const pill = itemRefs.current[categoryId]
    if (!scroller || !pill) return
    scrollPillHorizontally(scroller, pill)
  }, [focusRequestId])

  return (
    <nav
      className={`${sticky ? 'category-nav-sticky' : ''} border-b border-copid-price/12 px-1 pb-2 pt-0.5`}
      aria-label="Categories"
    >
      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-2 overflow-x-auto overscroll-x-contain px-2 py-1.5"
      >
        {categories.map((category) => {
          const isActive = category.id === activeId
          const Icon = categoryIcons[category.id] ?? Sandwich
          const photo = failedPhotos[category.id] ? undefined : getCategoryImage(category.id)
          return (
            <button
              key={category.id}
              type="button"
              ref={(node) => {
                itemRefs.current[category.id] = node
              }}
              onClick={() => onSelect(category.id)}
              className={`category-pill flex w-[72px] shrink-0 flex-col items-center gap-1.5 ${
                isActive ? 'active' : ''
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="category-icon-circle flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full bg-black/40 shadow-md ring-1 ring-copid-price/25">
                {photo ? (
                  <MenuImage
                    src={photo}
                    alt=""
                    className={`category-icon-photo category-icon-photo--${category.id}`}
                    eager
                    onUnavailable={() =>
                      setFailedPhotos((prev) => ({ ...prev, [category.id]: true }))
                    }
                  />
                ) : (
                  <Icon
                    size={24}
                    strokeWidth={1.75}
                    absoluteStrokeWidth={false}
                    className="text-copid-price"
                    aria-hidden="true"
                  />
                )}
              </span>
              <span className="line-clamp-2 min-h-[2.2em] text-center text-[11px] font-semibold leading-tight text-copid-accent">
                {tr(category.name)}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
