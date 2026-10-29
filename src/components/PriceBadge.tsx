import { useLanguage } from '../hooks/useLanguage'
import { currencyLabel, formatPrice } from '../utils/format'

type Props = {
  price: number
  mealPrice?: number
  className?: string
}

function PriceLine({ label, price }: { label?: string; price: number }) {
  const { locale } = useLanguage()
  const amount = formatPrice(price, locale)
  const currency = currencyLabel(locale)

  if (!label) {
    return (
      <span className="price-line" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {locale === 'ar' ? (
          <>
            {amount} {currency}
          </>
        ) : (
          <>
            {amount} {currency}
          </>
        )}
      </span>
    )
  }

  if (locale === 'ar') {
    return (
      <span className="price-line">
        {label} {amount} {currency}
      </span>
    )
  }

  return (
    <span className="price-line" dir="ltr">
      {label} {amount} {currency}
    </span>
  )
}

export function PriceBadge({ price, mealPrice, className = '' }: Props) {
  const { ui } = useLanguage()

  if (mealPrice == null) {
    return (
      <span className={className}>
        <PriceLine price={price} />
      </span>
    )
  }

  return (
    <span className={`flex flex-col items-start gap-0.5 ${className}`}>
      <PriceLine label={ui('priceSingle')} price={price} />
      <PriceLine label={ui('priceMeal')} price={mealPrice} />
    </span>
  )
}
