export type Locale = 'ar' | 'en'

export type LocalizedString = {
  ar: string
  en: string
}

export type ImageFrame =
  | 'burger'
  | 'plate'
  | 'steak'
  | 'salad'
  | 'slider'
  | 'slider-mix'
  | 'shrimp'

export type Product = {
  id: string
  categoryId: string
  name: LocalizedString
  description: LocalizedString
  image: string | null
  calories: number | null
  price: number | null
  mealPrice?: number
  pricePending?: boolean
  available: boolean
  badge?: LocalizedString
  note?: LocalizedString
  allergens?: LocalizedString[]
  frame?: ImageFrame
}

export type Category = {
  id: string
  name: LocalizedString
  image: string
  order: number
  displayMode?: 'compact-options-no-photo-binding'
}

export type RestaurantInfo = {
  name: LocalizedString
  welcome: LocalizedString
  logo: string
  coverImage: string
  currency: {
    code: string
    symbolAr: string
    symbolEn: string
  }
  instagramUrl?: string
  city: LocalizedString
}
