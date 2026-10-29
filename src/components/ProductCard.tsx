import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types/menu'
import { useLanguage } from '../hooks/useLanguage'
import { formatCalories } from '../utils/format'
import { MenuImage } from './MenuImage'
import { PriceBadge } from './PriceBadge'

type Props = {
  product: Product
}

function Placeholder({ label }: { label: string }) {
  return (
    <span className="product-placeholder" aria-hidden="true">
      <img src="/images/logo-96.svg" alt="" className="product-placeholder-mark" />
      <span className="product-placeholder-label">{label}</span>
    </span>
  )
}

export function ProductCard({ product }: Props) {
  const { tr, ui, locale, dir } = useLanguage()
  const calories = formatCalories(product.calories, locale)
  const description = tr(product.description)
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = Boolean(product.image) && !photoFailed
  const frame = product.frame ?? 'burger'

  return (
    <Link
      to={`/item/${product.id}`}
      className="flex min-w-0 items-stretch gap-3.5 px-3 py-3.5 text-inherit no-underline transition active:bg-white/5 sm:px-4"
      dir="ltr"
    >
      {showPhoto && product.image ? (
        <span className={`product-image product-image-frame frame-${frame}`}>
          <MenuImage
            src={product.image}
            alt={tr(product.name)}
            className={`product-image-zoom product-image-zoom--${product.id}`}
            width={132}
            height={132}
            onUnavailable={() => setPhotoFailed(true)}
          />
        </span>
      ) : (
        <Placeholder label={ui('photoSoon')} />
      )}

      <div className="flex min-w-0 flex-1 flex-col" dir={dir}>
        <div className="flex items-start gap-2">
          <h3 className="min-w-0 flex-1 text-[1.08rem] font-bold leading-snug text-copid-accent">
            {tr(product.name)}
          </h3>
          {product.badge ? (
            <span className="shrink-0 rounded-md border border-copid-price/40 px-1.5 py-0.5 text-[10px] font-bold text-copid-price">
              {tr(product.badge)}
            </span>
          ) : null}
        </div>

        {description ? (
          <p className="product-desc mt-1 line-clamp-3 text-[13px] leading-relaxed text-copid-accent/80">
            {description}
          </p>
        ) : null}

        {product.price != null ? (
          <div className="mt-auto flex justify-start pt-2">
            <PriceBadge price={product.price} mealPrice={product.mealPrice} />
          </div>
        ) : product.pricePending ? (
          <p className="price-line mt-auto pt-2">{ui('pricePending')}</p>
        ) : null}

        {calories ? (
          <p className="calorie-label">
            <span className="calorie-dot" aria-hidden="true" />
            <span>{calories}</span>
          </p>
        ) : null}
      </div>
    </Link>
  )
}
