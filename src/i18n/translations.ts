import type { Locale } from '../types/menu'

export const ui = {
  ar: {
    languageLabel: 'English',
    calories: 'سعرة حرارية',
    photoSoon: 'الصورة قريباً',
    allergensTitle: 'يحتوي على أطعمة قد تسبب الحساسية',
    allergensLink: 'مسببات الحساسية',
    feedbackLink: 'الملاحظات والتقييم',
    nutrition: 'التغذية والنشاط',
    newBadge: 'جديد',
    unavailable: 'غير متوفر',
    emptyTitle: 'لا توجد أصناف',
    emptyBody: 'جرّب فئة أخرى أو عد لاحقاً.',
    loading: 'جاري التحميل...',
    back: 'رجوع',
    share: 'مشاركة',
    close: 'إغلاق',
    menu: 'القائمة',
    priceSingle: 'ساندوتش',
    priceMeal: 'وجبة',
    noPhoto: 'بدون صورة',
    pricePending: 'السعر قريباً',
  },
  en: {
    languageLabel: 'العربية',
    calories: 'kcal',
    photoSoon: 'Photo coming soon',
    allergensTitle: 'Contains foods that may cause allergies',
    allergensLink: 'Allergens',
    feedbackLink: 'Feedback & Reviews',
    nutrition: 'Nutrition & Activity',
    newBadge: 'New',
    unavailable: 'Unavailable',
    emptyTitle: 'No items found',
    emptyBody: 'Try another category or check back later.',
    loading: 'Loading...',
    back: 'Back',
    share: 'Share',
    close: 'Close',
    menu: 'Menu',
    priceSingle: 'Sandwich',
    priceMeal: 'Meal',
    noPhoto: 'No photo',
    pricePending: 'Price coming soon',
  },
} as const

export type UiKey = keyof (typeof ui)['en']

export function t(locale: Locale, key: UiKey): string {
  return ui[locale][key]
}
