import { useLanguage } from '../hooks/useLanguage'

export function LoadingState() {
  const { ui } = useLanguage()

  return (
    <div className="menu-shell flex min-h-dvh items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-copid-accent">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-copid-accent/30 border-t-copid-accent" />
        <p className="text-sm opacity-80">{ui('loading')}</p>
      </div>
    </div>
  )
}
