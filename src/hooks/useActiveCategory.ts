import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Tracks which category section is in view.
 * Manual scrolling only updates activeId — it never scrolls the page.
 * While a click-driven scroll is in progress, observer updates are ignored
 * so they cannot fight the intentional scroll or create feedback loops.
 */
export function useActiveCategory(categoryIds: string[], offset = 160) {
  const [activeId, setActiveIdState] = useState(categoryIds[0] ?? '')
  const lockedRef = useRef(false)
  const idsKey = categoryIds.join('|')

  const setActiveId = useCallback((id: string) => {
    setActiveIdState(id)
  }, [])

  const lockScrollSpy = useCallback(() => {
    lockedRef.current = true
  }, [])

  const unlockScrollSpy = useCallback(() => {
    lockedRef.current = false
  }, [])

  useEffect(() => {
    const ids = idsKey ? idsKey.split('|') : []
    if (!ids.length) return

    const elements = ids
      .map((id) => document.getElementById(`category-${id}`))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockedRef.current) return

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const nextId = visible[0]?.target?.id?.replace('category-', '')
        if (nextId) {
          setActiveIdState((prev) => (prev === nextId ? prev : nextId))
        }
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -45% 0px`,
        threshold: [0.15, 0.35, 0.55],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [idsKey, offset])

  return { activeId, setActiveId, lockScrollSpy, unlockScrollSpy }
}
