import { useEffect, useId } from 'react'
import type { DesignProject } from '../data/design'

export default function DesignPopover({
  project,
  onClose,
}: {
  project: DesignProject
  onClose: () => void
}) {
  const titleId = useId()

  // Esc to close; lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <article className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        {/* Sticky header with title, tools, links */}
        <header className="modal-head">
          <h3 id={titleId} className="modal-title">{project.title}</h3>

          {project.tools?.length ? (
            <div className="chips">
              {project.tools.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
          ) : null}

          {project.links?.length ? (
            <div className="modal-links">
              {project.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
              ))}
            </div>
          ) : null}
        </header>

        {/* Scrollable content */}
        <div className="modal-body">
          {project.description && <p className="modal-description">{project.description}</p>}

          {/* Prefer sections when present; else fall back to flat images */}
          {project.sections
            ? project.sections.map((sec, idx) => (
                <section key={idx} className="modal-section">
                  {sec.title && <h4 className="section-title">{sec.title}</h4>}
                  {sec.paragraphs?.map((txt, i) => (
                    <p key={i} className="section-text">{txt}</p>
                  ))}
                  {sec.images?.map((img, i) => (
                    <figure key={i} className="modal-figure">
                      <img src={img.src} alt={img.alt ?? ''} />
                      {img.caption && <figcaption>{img.caption}</figcaption>}
                    </figure>
                  ))}
                </section>
              ))
            : project.images?.map((img, i) => (
                <figure key={i} className="modal-figure">
                  <img src={img.src} alt={img.alt ?? ''} />
                  {img.caption && <figcaption>{img.caption}</figcaption>}
                </figure>
              ))
          }
        </div>
      </article>
    </div>
  )
}
