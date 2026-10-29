import { useLanguage } from '../hooks/useLanguage'

export function EmptyState() {
  const { ui } = useLanguage()

  return (
    <div className="px-5 py-16 text-center text-copid-accent">
      <h2 className="mb-2 text-lg font-semibold">{ui('emptyTitle')}</h2>
      <p className="text-sm opacity-75">{ui('emptyBody')}</p>
    </div>
  )
}
