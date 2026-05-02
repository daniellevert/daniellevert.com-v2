import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WORDS = [
  '.creative',
  '.thinker',
  '.coder',
  '.engineer',
  '.artist',
  '.photographer',
  '.filmmaker',
  '.storyteller',
  '.editor',
  '.curious',
  '.disciplined',
  '.playful',
  '.builder',
  '.writer',
  '.designer',
  '.actor',
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

export default function Landing() {
  const navigate = useNavigate()
  const initialWords = useMemo(() => pickRandomWords(WORDS, 3), [])
  const [words, setWords] = useState<[string, string, string]>(initialWords)
  const [typed, setTyped] = useState<[number, number, number]>([0, 0, 0])
  const [line, setLine] = useState(0)
  const [cycling, setCycling] = useState(false)
  const [setCount, setSetCount] = useState(1)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (cycling || leaving) return

    if (line <= 2) {
      const text = words[line]
      if (typed[line] < text.length) {
        const t = window.setTimeout(() => {
          setTyped(prev => {
            const next = [...prev] as [number, number, number]
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

    if (line === 3) {
      const h = window.setTimeout(() => {
        setCycling(true)
      }, setCount >= MAX_SETS ? HOLD_AFTER_FIRST_SEQUENCE : HOLD_AFTER_SET)
      return () => window.clearTimeout(h)
    }
  }, [cycling, leaving, line, setCount, typed, words])

  useEffect(() => {
    if (!cycling || leaving) return
    const t = window.setTimeout(() => {
      setWords(pickRandomWords(WORDS, 3))
      setTyped([0, 0, 0])
      setLine(0)
      setSetCount((count) => (count >= MAX_SETS ? 1 : count + 1))
      setCycling(false)
    }, SET_FADE_MS)
    return () => window.clearTimeout(t)
  }, [cycling, leaving])

  function handleNavigate(to: string) {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => navigate(to), LEAVE_FADE_MS)
  }

  const [t0, t1, t2] = typed
  const [s0, s1, s2] = words

  return (
    <section className={`landing landing-centered ${leaving ? 'is-leaving' : ''}`}>
      <div className="landing-shell">
        <div className="landing-brand-group">
          <div className="landing-brand">DANIELLEVERT.</div>
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

        <div className={`typing-block ${cycling ? 'fade-out' : ''}`} aria-live="polite">
          <TypingLine text={s0} shown={t0} showCursor={line === 0 && t0 < s0.length} />
          <TypingLine text={s1} shown={t1} showCursor={line === 1 && t1 < s1.length} />
          <TypingLine text={s2} shown={t2} showCursor={line === 2 && t2 < s2.length} />
        </div>
      </div>
    </section>
  )
}

function TypingLine({ text, shown, showCursor }: { text: string; shown: number; showCursor: boolean }) {
  return (
    <div className="typing-line">
      <span className="typed">{text.slice(0, shown)}</span>
      <span className={`cursor ${showCursor ? 'on' : ''}`} aria-hidden="true">|</span>
    </div>
  )
}

function pickRandomWords(words: readonly string[], count: number) {
  const pool = [...words]
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, count) as [string, string, string]
}
