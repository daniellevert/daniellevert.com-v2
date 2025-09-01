// src/pages/Code.tsx
import { useEffect, useMemo, useState } from 'react'
import { CODE_CFG } from '../data/code-config'

type Repo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  homepage: string | null
  stargazers_count: number
  forks_count: number
  archived: boolean
  fork: boolean
  pushed_at: string
}

type Card = {
  id: number
  name: string
  url: string
  desc: string
  language: string | null
  homepage: string | null
  stars: number
  forks: number
  cover?: string   // /public/code/<repo>.(jpg|jpeg|png|webp|svg)
  video?: string   // embeddable YouTube/Vimeo URL
}

// Load any cover images placed under /public/code
const coverFiles = import.meta.glob('/public/code/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

function toNameMap(obj: Record<string, string>) {
  const map: Record<string, string> = {}
  for (const [path, url] of Object.entries(obj)) {
    const base = path.split('/').pop() || ''
    const name = base.replace(/\.[^.]+$/, '').toLowerCase()
    map[name] = url
  }
  return map
}

const COVER_MAP = toNameMap(coverFiles)

function toEmbed(url: string): string {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    // youtu.be/<id>
    if (host === 'youtu.be') return `https://www.youtube.com/embed/${u.pathname.slice(1)}?rel=0&modestbranding=1`
    // youtube.com/watch?v=<id>
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      const id = u.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1` : url
    }
    // vimeo.com/<id>
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`
    }
    return url
  } catch {
    return url
  }
}

export default function Code() {
  const [repos, setRepos] = useState<Card[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setErr(null)
        const r = await fetch(
          `https://api.github.com/users/${CODE_CFG.githubUser}/repos?per_page=100&sort=updated`,
          { headers: { Accept: 'application/vnd.github+json' } }
        )
        if (!r.ok) throw new Error(`GitHub error ${r.status}`)
        const data: Repo[] = await r.json()

        const filtered = data.filter(repo => {
          if (CODE_CFG.hideForks && repo.fork) return false
          if (CODE_CFG.hideArchived && repo.archived) return false
          if (CODE_CFG.include && !CODE_CFG.include.includes(repo.name)) return false
          if (CODE_CFG.exclude.includes(repo.name)) return false
          return true
        })

        const cards: Card[] = filtered.map(repo => {
          const key = repo.name.toLowerCase()
          const rawVideo = CODE_CFG.videoLinks?.[key]
          return {
            id: repo.id,
            name: repo.name,
            url: repo.html_url,
            desc: repo.description ?? '',
            language: repo.language,
            homepage: repo.homepage && repo.homepage.trim() ? repo.homepage : null,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            cover: COVER_MAP[key],
            video: rawVideo ? toEmbed(rawVideo) : undefined,
          }
        })

        // Pinned then alpha (simple, stable)
        const pin = CODE_CFG.pin ?? []
        const pinSet = new Set(pin)
        const unpinned = cards.filter(c => !pinSet.has(c.name)).sort((a, b) => a.name.localeCompare(b.name))
        const pinned = pin.map(p => cards.find(c => c.name === p)).filter(Boolean) as Card[]

        if (!cancelled) setRepos([...pinned, ...unpinned])
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || 'Failed to load repositories')
      }
    })()
    return () => { cancelled = true }
  }, [])

  const content = useMemo(() => {
    if (err) return <p style={{ color: 'var(--muted)' }}>Couldn’t load projects right now. Please try again later.</p>
    if (!repos) return <p style={{ color: 'var(--muted)' }}>Loading projects…</p>
    if (repos.length === 0) return <p style={{ color: 'var(--muted)' }}>No projects to show yet.</p>

    return (
      <div className="code-grid">
        {repos.map(card => (
          <article key={card.id} className="card code-card">
            {/* Media: prefer external video embed, else cover image, else nothing */}
            {card.video ? (
              <div className="code-cover">
                <iframe
                  src={card.video}
                  title={`${card.name} preview`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : card.cover ? (
              <a
                className="code-cover"
                href={card.homepage || card.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${card.name} link`}
              >
                <img src={card.cover} alt={`${card.name} cover`} />
              </a>
            ) : null}

            <div className="code-meta">
              <div className="code-header">
                <a href={card.url} target="_blank" rel="noreferrer" className="code-title">
                  {card.name}
                </a>
                <div className="code-links">
                  {card.homepage && (
                    <a href={card.homepage} target="_blank" rel="noreferrer" className="btn-link">demo</a>
                  )}
                  <a href={card.url} target="_blank" rel="noreferrer" className="btn-link">repo</a>
                </div>
              </div>

              {card.desc && <p className="code-desc">{card.desc}</p>}

              <div className="code-stats">
                {card.language && <span>{card.language}</span>}
                <span>★ {card.stars}</span>
                <span>⎇ {card.forks}</span>
                {/* intentionally no "updated" date */}
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  }, [repos, err])

  return (
    <section className="wrap">
      <div className="hero" style={{ margin: '2rem 0 1rem' }}>
        <h1>Code</h1>
        <h2>selected projects</h2>
      </div>
      {content}
    </section>
  )
}
