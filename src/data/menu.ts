import type { Category, ImageFrame, Product } from '../types/menu'
import menuData from './menu-data.json'

type SourceItem = {
  id: string
  name: { ar: string; en: string }
  description?: { ar: string; en: string }
  calories?: number | null
  price?: { sandwich?: number; meal?: number; single?: number }
  pricePending?: boolean
  image?: string | null
  variantLabel?: { ar: string; en: string }
  frame?: ImageFrame
}

type SourceCategory = {
  id: string
  name: { ar: string; en: string }
  displayMode?: Category['displayMode']
  priceEach?: number
  items: SourceItem[]
}

const sourceCategories = menuData.categories as SourceCategory[]

const CATEGORY_THUMBS: Record<string, string | null> = {
  'chicken-burgers': '/assets/menu-final/burger-slushi.webp',
  'beef-burgers': '/assets/menu-final/classic-beef.webp',
  'ribs-steaks': '/assets/menu-final/ribs.webp',
  appetizers: '/assets/menu-final/dynamite-shrimp.jpg',
  'sides-salads': '/assets/menu-final/jalapeno-fries.webp',
  sliders: '/assets/menu-final/slider-beef.jpg',
  wraps: '/assets/menu-final/wrap.jpg',
  sauces: '/assets/menu-final/sauce-slushi.jpg',
  drinks: null,
}

function toPublicPath(image: string | null | undefined): string | null {
  if (!image) return null
  return image.startsWith('/') ? image : `/${image}`
}

export const categories: Category[] = sourceCategories.map((category, index) => {
  const thumb = CATEGORY_THUMBS[category.id]
  const firstImage = category.items.find((item) => Boolean(item.image))?.image

  return {
    id: category.id,
    name: category.name,
    image: thumb ?? toPublicPath(firstImage) ?? '/images/placeholder-product.svg',
    order: index + 1,
    displayMode: category.displayMode,
  }
})

export const products: Product[] = sourceCategories.flatMap((category) =>
  category.items.map((item) => {
    const sandwich = item.price?.sandwich
    const meal = item.price?.meal
    const single = item.price?.single ?? category.priceEach

    return {
      id: item.id,
      categoryId: category.id,
      name: item.name,
      description: item.description ?? { ar: '', en: '' },
      image: toPublicPath(item.image),
      calories: item.calories ?? null,
      price: sandwich ?? single ?? null,
      mealPrice: meal,
      pricePending: Boolean(item.pricePending),
      available: true,
      badge: item.variantLabel,
      frame: item.frame,
    }
  }),
)

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId && p.available)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getCategoryImage(categoryId: string): string | undefined {
  const category = categories.find((c) => c.id === categoryId)
  if (!category?.image || category.image.includes('placeholder')) return undefined
  if (categoryId === 'drinks') return undefined
  return category.image
}
