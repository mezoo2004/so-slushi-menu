import type { RestaurantInfo } from '../types/menu'
import menuData from './menu-data.json'

export const restaurant: RestaurantInfo = {
  name: {
    ar: menuData.brand.name.ar,
    en: menuData.brand.name.en,
  },
  welcome: {
    ar: menuData.brand.name.ar,
    en: menuData.brand.name.en,
  },
  logo: '/assets/brand/so-slushi-logo.png',
  coverImage: '/assets/brand/hero-ribs.jpg',
  currency: {
    code: 'SAR',
    symbolAr: menuData.currency.ar,
    symbolEn: menuData.currency.en,
  },
  city: {
    ar: '',
    en: '',
  },
}
