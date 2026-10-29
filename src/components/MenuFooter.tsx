import { useLanguage } from '../hooks/useLanguage'

export function MenuFooter() {
  const { ui } = useLanguage()

  return (
    <footer className="pt-2">
      <div
        id="feedback"
        className="px-4 pb-10 pt-5 text-center text-sm font-semibold text-copid-accent opacity-90"
      >
        {ui('feedbackLink')}
      </div>
    </footer>
  )
}
