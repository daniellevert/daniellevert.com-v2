import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const WORDS = [
  '.crea\u00adtive',
  '.think\u00ader',
  '.cod\u00ader',
  '.en\u00adgi\u00adneer',
  '.art\u00adist',
  '.pho\u00adtog\u00adra\u00adpher',
  '.film\u00admak\u00ader',
  '.sto\u00adry\u00adtell\u00ader',
  '.ed\u00adi\u00adtor',
  '.cu\u00adri\u00adous',
  '.dis\u00adci\u00adplined',
  '.play\u00adful',
  '.build\u00ader',
  '.writ\u00ader',
  '.de\u00adsign\u00ader',
  '.ac\u00adtor',
] as const

const NAV_ITEMS = [
  { label: 'photo', to: '/photo?f=featured' },
  { label: 'video', to: '/video' },
  { label: 'design', to: '/design' },
  { label: 'code', to: '/code' },
  { label: 'about/me', to: '/about' },
] as const

const TYPE_MS = 40
const HOLD_AFTER_LINE = 200
const HOLD_AFTER_SET = 2600
const HOLD_AFTER_FIRST_SEQUENCE = 5200
const SET_FADE_MS = 450
const LEAVE_FADE_MS = 300
const MAX_SETS = 3
const MOBILE_QUERY = '(max-width: 640px)'

export default function Landing() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(media.matches)
    media.addEventListener('change', update)
    update()
    return () => media.removeEventListener('change', update)
  }, [])

  const wordCount = isMobile ? 5 : 3
  return <LandingAnimation key={wordCount} wordCount={wordCount} />
}

function LandingAnimation({ wordCount }: { wordCount: number }) {
  const navigate = useNavigate()
  const initialWords = useMemo(() => pickRandomWords(WORDS, wordCount), [wordCount])
  const [words, setWords] = useState<string[]>(initialWords)
  const [typed, setTyped] = useState<number[]>(Array(wordCount).fill(0))
  const [line, setLine] = useState(0)
  const [cycling, setCycling] = useState(false)
  const [setCount, setSetCount] = useState(1)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (cycling || leaving) return

    if (line < words.length) {
      const text = words[line]
      if (typed[line] < text.length) {
        const t = window.setTimeout(() => {
          setTyped(prev => {
            const next = [...prev]
            next[line] = Math.min(text.length, prev[line] + 1)
            return next
          })
        }, TYPE_MS)
        return () => window.clearTimeout(t)
      } else {
        const h = window.setTimeout(() => setLine(l => l + 1), HOLD_AFTER_LINE)
        return () => window.clearTimeout(h)
      }
    }

    if (line === words.length) {
      const h = window.setTimeout(() => {
        setCycling(true)
      }, setCount >= MAX_SETS ? HOLD_AFTER_FIRST_SEQUENCE : HOLD_AFTER_SET)
      return () => window.clearTimeout(h)
    }
  }, [cycling, leaving, line, setCount, typed, words])

  useEffect(() => {
    if (!cycling || leaving) return
    const t = window.setTimeout(() => {
      setWords(pickRandomWords(WORDS, wordCount))
      setTyped(Array(wordCount).fill(0))
      setLine(0)
      setSetCount((count) => (count >= MAX_SETS ? 1 : count + 1))
      setCycling(false)
    }, SET_FADE_MS)
    return () => window.clearTimeout(t)
  }, [cycling, leaving, wordCount])

  function handleNavigate(to: string) {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => navigate(to), LEAVE_FADE_MS)
  }

  const block = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const element = block.current
    if (!element) return
    const fit = () => {
      element.style.removeProperty('--typing-size')
      const sample = element.querySelector<HTMLElement>('.typed')
      if (!sample) return
      let size = parseFloat(getComputedStyle(sample).fontSize)
      // Measure the full words, including unrevealed letters, to avoid resizing while typing.
      for (let i = 0; i < 100 && element.scrollHeight > element.clientHeight + 1; i++) {
        size *= 0.97
        element.style.setProperty('--typing-size', `${size}px`)
      }
    }
    const observer = new ResizeObserver(fit)
    observer.observe(element)
    fit()
    return () => observer.disconnect()
  }, [words])

  return (
    <section className={`landing landing-centered ${leaving ? 'is-leaving' : ''}`}>
      <div className="landing-shell">
        <div className="landing-brand-group">
          <div className="landing-brand"><Link to="/photo?f=featured" aria-label="Daniel LeVert photography">DANIELLEVERT.</Link></div>
          <div className="landing-tagline">ENGINEER + CREATIVE</div>
        </div>

        <nav className="landing-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.to}
              type="button"
              className="landing-nav-link"
              onClick={() => handleNavigate(item.to)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div ref={block} className={`typing-block ${cycling ? 'fade-out' : ''}`} aria-live="polite" lang="en">
          {words.map((word, index) => (
            <TypingLine key={index} text={word} shown={typed[index]} showCursor={line === index && typed[index] < word.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TypingLine({ text, shown, showCursor }: { text: string; shown: number; showCursor: boolean }) {
  return (
    <div className="typing-line">
      <span className="typed">
        {text.slice(0, shown)}
        <span className="typing-unrevealed" aria-hidden="true">{text.slice(shown)}</span>
        {showCursor && <span className="sr-only">…</span>}
      </span>
    </div>
  )
}

function pickRandomWords(words: readonly string[], count: number) {
  const pool = [...words]
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count)
}
