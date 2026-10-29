import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { categories, getProductsByCategory } from '../data/menu'
import { Header } from '../components/Header'
import { RestaurantInfo } from '../components/RestaurantInfo'
import { CategoryNav } from '../components/CategoryNav'
import { CategorySection } from '../components/CategorySection'
import { MenuFooter } from '../components/MenuFooter'
import { SideMenu } from '../components/SideMenu'
import { useActiveCategory } from '../hooks/useActiveCategory'

const STICKY_OFFSET = 118

export function MenuPage() {
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [],
  )
  const categoryIds = useMemo(
    () => sortedCategories.map((c) => c.id),
    [sortedCategories],
  )
  const { activeId, setActiveId, lockScrollSpy, unlockScrollSpy } =
    useActiveCategory(categoryIds, STICKY_OFFSET)
  const [menuOpen, setMenuOpen] = useState(false)
  const [focusRequestId, setFocusRequestId] = useState<string | null>(null)
  const settleTimerRef = useRef<number | null>(null)
  const safetyTimerRef = useRef<number | null>(null)
  const unlockingRef = useRef(false)
  const focusSeqRef = useRef(0)

  const clearScrollTimers = useCallback(() => {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current)
      settleTimerRef.current = null
    }
    if (safetyTimerRef.current !== null) {
      window.clearTimeout(safetyTimerRef.current)
      safetyTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      clearScrollTimers()
      unlockScrollSpy()
    }
  }, [clearScrollTimers, unlockScrollSpy])

  const scrollToCategory = useCallback(
    (id: string) => {
      const el = document.getElementById(`category-${id}`)
      if (!el) return

      clearScrollTimers()
      unlockingRef.current = false

      lockScrollSpy()
      setActiveId(id)
      focusSeqRef.current += 1
      setFocusRequestId(`${id}:${focusSeqRef.current}`)

      const top = el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })

      const finish = () => {
        if (unlockingRef.current) return
        unlockingRef.current = true
        clearScrollTimers()
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('scrollend', onScrollEnd)
        unlockScrollSpy()
      }

      const onScrollEnd = () => finish()

      const onScroll = () => {
        if (settleTimerRef.current !== null) {
          window.clearTimeout(settleTimerRef.current)
        }
        settleTimerRef.current = window.setTimeout(finish, 140)
      }

      window.addEventListener('scrollend', onScrollEnd, { once: true })
      window.addEventListener('scroll', onScroll, { passive: true })
      safetyTimerRef.current = window.setTimeout(finish, 1200)
    },
    [clearScrollTimers, lockScrollSpy, setActiveId, unlockScrollSpy],
  )

  return (
    <div className="menu-shell">
      <Header onMenuClick={() => setMenuOpen(true)} />

      <div className="brand-section">
        <div className="brand-agave-clip" aria-hidden="true">
          <div className="brand-agave" />
        </div>
        <div className="brand-section-content">
          <RestaurantInfo
            onFeedbackClick={() => {
              document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })
            }}
          />

          <CategoryNav
            categories={sortedCategories}
            activeId={activeId}
            focusRequestId={focusRequestId}
            sticky
            onSelect={scrollToCategory}
          />
        </div>
      </div>

      <div className="sheet-panel mt-1">
        <div className="sheet-handle" aria-hidden="true" />
        {sortedCategories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            products={getProductsByCategory(category.id)}
          />
        ))}
        <MenuFooter />
      </div>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
