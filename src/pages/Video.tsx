import { useMemo, useState } from 'react'
import { VIDEOS, type VideoKind } from '../data/videos'

type Filter = 'all' | VideoKind

function toEmbed(url: string): string {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') return `https://www.youtube.com/embed/${u.pathname.slice(1)}`
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const id = u.searchParams.get('v')
      if (id) return `https://www.youtube.com/embed/${id}`
      return url
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return `https://player.vimeo.com/video/${id}`
    }
    return url
  } catch {
    return url
  }
}

export default function VideoPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const items = useMemo(() => {
    if (filter === 'all') return VIDEOS
    return VIDEOS.filter(v => v.kind === filter)
  }, [filter])

  return (
    <section className="wrap">
      <div className="hero" style={{ margin: '2rem 0 1rem' }}>
        <h1>Video</h1>
        <h2>commercial & short film</h2>
      </div>

      <div className="filters">
        {(['all','commercial','short'] as Filter[]).map(f => (
          <button
            key={f}
            className={`chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {items.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>
          No videos in this filter yet. Try switching filters or select “all” to see everything.
        </p>
      )}

      <div className="video-stack">
        {items.map(v => (
          <article key={v.id} className="card video-card">
            <div className="video-embed">
              <iframe
                src={toEmbed(v.url)}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="video-meta">
              <h3 className="video-title">{v.title}</h3>
              {v.description && <p className="video-desc">{v.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
