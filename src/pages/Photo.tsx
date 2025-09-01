import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Lightbox from '../components/Lightbox'

type Category = 'editorial' | 'nyfw' | 'other'
type Filter = Category | 'featured'

const FEATURE_PAT = /(?:^|[-_.])(f|feat|featured)(?=\.[a-z0-9]+$)/i
const ALL_FILTERS: Filter[] = ['featured', 'editorial', 'nyfw', 'other']

type Item = {
  src: string
  rel: string
  name: string
  alt: string
  cat: Category
  isFeatured: boolean
}

const files = import.meta.glob('/public/photo/**/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

function infer(absPath: string): Item {
  const src = files[absPath]
  const rel = absPath.replace(/^\/public/, '')
  const parts = rel.split('/').filter(Boolean)
  const folder = (parts[1] || '').toLowerCase()
  const name = parts[parts.length - 1] || ''

  let cat: Category
  if (folder === 'editorial' || folder === 'nyfw') cat = folder as Category
  else cat = 'other'

  const isFeatured = FEATURE_PAT.test(name)
  const alt = name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  return { src, rel, name, alt, cat, isFeatured }
}

const BASE_ITEMS: Item[] = Object.keys(files)
  .map(infer)
  .sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true, sensitivity: 'base' }))

function parseFilters(qs: URLSearchParams): Set<Filter> {
  const raw = (qs.get('f') || '').trim()
  if (!raw) return new Set()
  const out = new Set<Filter>()
  raw.split(',').forEach(tok => {
    const t = tok.trim().toLowerCase()
    if ((ALL_FILTERS as string[]).includes(t)) out.add(t as Filter)
  })
  return out
}

export default function Photo() {
  const [params, setParams] = useSearchParams()
  const [selected, setSelected] = useState<Set<Filter>>(() => parseFilters(params))

  // Read from URL when ?f changes
  useEffect(() => {
    setSelected(parseFilters(params))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get('f')])

  // Write to URL when selection changes (prevent loops)
  useEffect(() => {
    const current = params.get('f') || ''
    const nextVal = selected.size === 0 ? '' : ALL_FILTERS.filter(f => selected.has(f)).join(',')
    if (current !== nextVal) {
      const next = new URLSearchParams(params)
      if (nextVal) next.set('f', nextVal)
      else next.delete('f')
      setParams(next, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const items = useMemo(() => {
    if (selected.size === 0) return BASE_ITEMS
    return BASE_ITEMS.filter(it => {
      for (const f of selected) {
        if (f === 'featured' && it.isFeatured) return true
        if (f === it.cat) return true
      }
      return false
    })
  }, [selected])

  // Lightbox
  const [index, setIndex] = useState<number | null>(null)
  const openAt = (i: number) => setIndex(i)
  const close = () => setIndex(null)
  const prev = () => setIndex(i => (i === null ? 0 : (i - 1 + items.length) % items.length))
  const next = () => setIndex(i => (i === null ? 0 : (i + 1) % items.length))

  // Close/guard lightbox when item set changes
  useEffect(() => {
    if (index !== null && (index < 0 || index >= items.length)) setIndex(null)
  }, [items, index])

  const toggle = (f: Filter) => {
    setIndex(null)
    setSelected(prev => {
      const s = new Set(prev)
      s.has(f) ? s.delete(f) : s.add(f)
      return s
    })
  }
  const clearAll = () => setSelected(new Set())

  const isActive = (f: Filter) => selected.has(f)
  const allActive = selected.size === 0
  const multi = selected.size > 1

  const CAT_LABEL: Record<Category, string> = {
    editorial: 'Editorial',
    nyfw: 'NYFW',
    other: 'Other',
  }

  return (
    <section className="wrap">
      <div className="hero" style={{ margin: '2rem 0 1rem' }}>
        <h1>Photo</h1>
        <h2>selected work</h2>
      </div>

      <div className="filters">
        <button className={`chip ${allActive ? 'active' : ''}`} onClick={clearAll}>all</button>
        <button className={`chip ${isActive('featured') ? 'active' : ''}`} onClick={() => toggle('featured')}>featured</button>
        <button className={`chip ${isActive('editorial') ? 'active' : ''}`} onClick={() => toggle('editorial')}>editorial</button>
        <button className={`chip ${isActive('nyfw') ? 'active' : ''}`} onClick={() => toggle('nyfw')}>nyfw</button>
        <button className={`chip ${isActive('other') ? 'active' : ''}`} onClick={() => toggle('other')}>other</button>
      </div>

      {items.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>
          No photos match those filters. Try a different combination or tap “all” to view everything.
        </p>
      )}

      <div className="grid" style={{ marginTop: '12px' }}>
        {items.map((it, i) => (
          <button
            key={it.src}
            className="photo-tile"
            onClick={() => openAt(i)}
            aria-label={`Open ${it.alt}`}
            style={{ border: 'none', padding: 0, background: 'none', position: 'relative' }}
          >
            {multi && <span className="badge">{CAT_LABEL[it.cat]}</span>}
            {!allActive && it.isFeatured && <span className="badge" style={{ right: 8, left: 'auto' }}>★</span>}
            <img src={it.src} alt={it.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {index !== null && items.length > 0 && (
        <Lightbox items={items} index={index} onClose={close} onPrev={prev} onNext={next} />
      )}
    </section>
  )
}
