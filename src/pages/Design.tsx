import { useState, KeyboardEvent } from 'react'
import { DESIGN, type DesignProject } from '../data/design'
import DesignPopover from '../components/DesignPopover'

export default function Design() {
  const [open, setOpen] = useState<DesignProject | null>(null)

  const onCardKey = (e: KeyboardEvent, project: DesignProject) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(project)
    }
  }

  return (
    <section className="wrap">
      <div className="hero" style={{ margin: '2rem 0 1rem' }}>
        <h1>Design</h1>
        <h2>product & visual — selected work</h2>
      </div>

      {DESIGN.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>
          Add projects in <code>src/data/design.ts</code> and assets in <code>/public/design/&lt;project&gt;</code>.
        </p>
      )}

      {/* Single column list, each card is fully clickable */}
      <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
        {DESIGN.map((p) => (
          <article
            key={p.id}
            className="card design-card clickable"
            role="button"
            tabIndex={0}
            aria-label={`Open ${p.title}`}
            onClick={() => setOpen(p)}
            onKeyDown={(e) => onCardKey(e, p)}
          >
            <div className="design-meta">
              <div className="design-title-row">
                <h3 className="design-title">{p.title}</h3>
                <span className="view-hint">click to view</span>
              </div>
              {p.summary && <p className="design-summary">{p.summary}</p>}
              {p.tools?.length ? (
                <div className="chips">{p.tools.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              ) : null}
            </div>

            <div className="design-cover" aria-hidden="true">
              {p.cover
                ? <img src={p.cover} alt="" />
                : <div className="cover-placeholder">preview</div>}
            </div>
          </article>
        ))}
      </div>

      {open && <DesignPopover project={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
