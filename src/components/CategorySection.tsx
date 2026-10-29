import { Link } from 'react-router-dom'
import type { Category, Product } from '../types/menu'
import { useLanguage } from '../hooks/useLanguage'
import { ProductCard } from './ProductCard'
import { EmptyState } from './EmptyState'
import { PriceBadge } from './PriceBadge'

type Props = {
  category: Category
  products: Product[]
}

function SauceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 10.5c0-2.4 2.2-4.4 5-4.4s5 2 5 4.4v5.2c0 1.7-2.2 3.1-5 3.1s-5-1.4-5-3.1v-5.2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 11.2c.7.6 1.8 1 3 1s2.3-.4 3-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function CategorySection({ category, products }: Props) {
  const { tr } = useLanguage()
  const isSauce = category.displayMode === 'compact-options-no-photo-binding'
  const isDrink = category.id === 'drinks'

  return (
    <section
      id={`category-${category.id}`}
      className="scroll-mt-[calc(7.4rem+env(safe-area-inset-top,0px))] px-1 pb-3 min-w-0"
    >
      <h2 className="px-4 pb-2 pt-3 text-[clamp(1.15rem,4.5vw,1.35rem)] font-bold text-copid-accent break-words">
        {tr(category.name)}
      </h2>

      {products.length === 0 ? (
        <EmptyState />
      ) : isSauce ? (
        <div className="sauce-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/item/${product.id}`}
              className="sauce-card text-inherit no-underline"
            >
              <span className="sauce-thumb">
                {product.image ? (
                  <img src={product.image} alt="" className="sauce-thumb-img" />
                ) : (
                  <span className="sauce-icon">
                    <SauceIcon />
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.9rem] font-semibold leading-snug text-copid-accent">
                  {tr(product.name)}
                </span>
              </span>
              {product.price != null ? <PriceBadge price={product.price} /> : null}
            </Link>
          ))}
        </div>
      ) : isDrink ? (
        <div className="grid grid-cols-1 gap-2 px-3 sm:grid-cols-2">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/item/${product.id}`}
              className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-copid-price/18 bg-copid-deep px-3.5 py-3 text-inherit no-underline"
            >
              <span className="min-w-0 text-[0.98rem] font-semibold leading-snug text-copid-accent">
                {tr(product.name)}
              </span>
              {product.price != null ? <PriceBadge price={product.price} /> : null}
            </Link>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-white/8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
