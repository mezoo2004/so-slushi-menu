import { restaurant } from '../data/restaurant'
import { useLanguage } from '../hooks/useLanguage'

type Props = {
  onFeedbackClick?: () => void
}

export function RestaurantInfo({ onFeedbackClick }: Props) {
  const { ui, toggleLocale, locale } = useLanguage()

  return (
    <section className="relative px-4 pb-1 pt-1 text-copid-accent">
      <div className="flex min-h-8 items-center justify-between" dir="ltr">
        <button
          type="button"
          onClick={toggleLocale}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 py-2 text-sm font-semibold text-copid-accent"
          aria-label={ui('languageLabel')}
        >
          <span className="text-[10px] opacity-80">▼</span>
          <span>{ui('languageLabel')}</span>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0 text-copid-price"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M3.5 12h17M12 3.5c2.5 2.8 3.8 5.6 3.8 8.5S14.5 17.7 12 20.5C9.5 17.7 8.2 14.9 8.2 12S9.5 6.3 12 3.5z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={onFeedbackClick}
          aria-label={ui('feedbackLink')}
          className="text-copid-price opacity-90 transition hover:opacity-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3.5l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 15.8l-4.8 2.46.92-5.34-3.88-3.78 5.36-.78L12 3.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="brand-lockup">
        <p className="welcome-heading welcome-heading-en">SO SLUSHI</p>
        {locale === 'ar' ? (
          <p className="brand-ar">{restaurant.name.ar}</p>
        ) : (
          <p className="brand-tag">Ribs · Steak · Burger</p>
        )}
      </div>
    </section>
  )
}
