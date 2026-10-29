import { restaurant } from '../data/restaurant'

type Props = {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: Props) {
  return (
    <header className="relative z-[2] w-full min-w-0">
      <div className="cover-frame" role="img" aria-label={restaurant.name.en}>
        <img
          src={restaurant.coverImage}
          alt=""
          className="cover-photo"
          fetchPriority="high"
          decoding="async"
        />
        <div className="cover-vignette" aria-hidden="true" />
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Menu"
          className="menu-profile-btn absolute left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-copid-price shadow-md backdrop-blur-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M5 19.5c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="logo-badge-wrap">
        <div className="logo-96" aria-hidden="false">
          <img
            src={restaurant.logo}
            alt={restaurant.name.en}
            className="logo-96-crop"
          />
        </div>
      </div>
    </header>
  )
}
