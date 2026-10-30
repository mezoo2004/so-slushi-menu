import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../data/menu'
import { useLanguage } from '../hooks/useLanguage'
import { formatCalories } from '../utils/format'
import { PriceBadge } from '../components/PriceBadge'
import { EmptyState } from '../components/EmptyState'
import { MenuImage } from '../components/MenuImage'

export function ProductDetails() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { tr, ui, locale } = useLanguage()
  const product = useMemo(() => getProductById(id), [id])
  const [photoFailed, setPhotoFailed] = useState(false)

  useEffect(() => {
    setPhotoFailed(false)
  }, [id])

  if (!product) {
    return (
      <div className="menu-shell">
        <EmptyState />
        <div className="px-4 pb-8 text-center">
          <Link to="/" className="text-copid-accent underline">
            {ui('back')}
          </Link>
        </div>
      </div>
    )
  }

  const calories = formatCalories(product.calories, locale)
  const description = tr(product.description)
  const showPhoto = Boolean(product.image) && !photoFailed
  const frame = product.frame ?? 'burger'

  const share = async () => {
    const shareData = {
      title: tr(product.name),
      text: description || tr(product.name),
      url: window.location.href,
    }
    try {
      if (navigator.share) await navigator.share(shareData)
      else await navigator.clipboard.writeText(window.location.href)
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="menu-shell pb-10">
      <div className="relative">
        {showPhoto && product.image ? (
          <MenuImage
            src={product.image}
            alt={tr(product.name)}
            className={`details-photo frame-${frame} product-image-zoom--${product.id}`}
            width={720}
            height={320}
            onUnavailable={() => setPhotoFailed(true)}
          />
        ) : (
          <div className="details-placeholder">
            <img src="/images/logo-96.svg" alt="" className="h-16 w-16 opacity-90" />
            <p className="mt-3 text-sm font-semibold tracking-wide text-copid-price">
              {ui('photoSoon')}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={share}
          aria-label={ui('share')}
          className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8.3 13.2l7.4 4.2M15.7 6.6l-7.4 4.2" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label={ui('back')}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9.5 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="px-4 pt-5">
        <div className="flex items-start gap-2">
          <h1 className="text-2xl font-bold text-copid-accent">{tr(product.name)}</h1>
          {product.badge ? (
            <span className="mt-1 shrink-0 rounded-md border border-copid-price/40 px-2 py-0.5 text-xs font-bold text-copid-price">
              {tr(product.badge)}
            </span>
          ) : null}
        </div>

        {description ? (
          <p className="product-desc mt-4 text-[15px] leading-relaxed text-copid-accent/90">
            {description}
          </p>
        ) : null}

        {product.note ? (
          <p className="product-note mt-3 text-sm font-semibold text-copid-price">{tr(product.note)}</p>
        ) : null}

        {product.price != null ? (
          <div className="mt-6 flex justify-start">
            <PriceBadge price={product.price} mealPrice={product.mealPrice} />
          </div>
        ) : product.pricePending ? (
          <p className="price-line mt-6">{ui('pricePending')}</p>
        ) : null}

        {calories ? (
          <p className="calorie-label mt-3">
            <span className="calorie-dot" aria-hidden="true" />
            <span>{calories}</span>
          </p>
        ) : null}
      </div>
    </div>
  )
}
