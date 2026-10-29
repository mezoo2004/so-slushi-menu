import { useLanguage } from '../hooks/useLanguage'

type Props = {
  open: boolean
  onClose: () => void
}

export function SideMenu({ open, onClose }: Props) {
  const { ui } = useLanguage()

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/55 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[min(332px,86vw)] bg-copid-sheet text-copid-accent shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 pb-4 pt-14">
          <h2 className="text-xl font-semibold">{ui('menu')}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui('close')}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
          >
            ✕
          </button>
        </div>
        <nav className="px-2">
          <a
            href="#feedback"
            onClick={onClose}
            className="block rounded-lg px-4 py-3 text-base text-copid-accent no-underline hover:bg-white/5"
          >
            {ui('feedbackLink')}
          </a>
        </nav>
      </aside>
    </>
  )
}
