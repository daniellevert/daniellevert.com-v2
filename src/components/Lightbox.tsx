import { useEffect } from 'react'

type Item = { src: string; alt?: string }

export default function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: Item[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  // keyboard: Esc to close, arrows to navigate
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  const current = items[index]

  return (
    <div className="lightbox-backdrop" role="dialog" aria-label="Image viewer" onClick={onClose}>
      <button
        className="lightbox-btn left"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
      >
        ‹
      </button>

      <img
        className="lightbox-img"
        src={current.src}
        alt={current.alt ?? ''}
        onClick={(e) => e.stopPropagation()}
      />

      <button
        className="lightbox-btn right"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
      >
        ›
      </button>

      <button
        className="lightbox-close"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label="Close"
      >
        ×
      </button>

      <div className="lightbox-counter">{index + 1} / {items.length}</div>
    </div>
  )
}
