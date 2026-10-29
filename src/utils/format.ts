import type { Locale } from '../types/menu'
import { restaurant } from '../data/restaurant'

export function formatPrice(price: number, _locale: Locale): string {
  return Number.isInteger(price) ? String(price) : price.toFixed(2)
}

export function currencyLabel(locale: Locale): string {
  return locale === 'ar' ? restaurant.currency.symbolAr : restaurant.currency.symbolEn
}

export function formatCalories(calories: number | null, locale: Locale): string | null {
  if (calories === null || calories === undefined) return null
  if (locale === 'ar') return `حوالي ${calories} سعرة حرارية`
  return `Approx. ${calories} kcal`
}
