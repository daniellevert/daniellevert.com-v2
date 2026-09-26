import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { advance, delayFor, FADE_MS, type AnimationState } from '../lib/landingAnimation'

const WORDS = [
  'creative', 'thinker', 'coder', 'engineer', 'artist', 'photographer',
  'filmmaker', 'storyteller', 'editor', 'curious', 'disciplined', 'playful',
  'builder', 'writer', 'designer', 'actor',
]

// Optional line breaks are presentation data; animation counts only real letters.
const BREAKS: Record<string, string> = {
  creative: 'crea-tive', thinker: 'think-er', coder: 'cod-er', engineer: 'en-gi-neer',
  artist: 'art-ist', photographer: 'pho-tog-ra-pher', filmmaker: 'film-mak-er',
  storyteller: 'sto-ry-tell-er', editor: 'ed-i-tor', curious: 'cu-ri-ous',
  disciplined: 'dis-ci-plined', playful: 'play-ful', builder: 'build-er',
  writer: 'writ-er', designer: 'de-sign-er', actor: 'ac-tor',
}
const NAV_ITEMS = [
  { label: 'photo', to: '/photo?f=featured' },
  { label: 'video', to: '/video' },
  { label: 'design', to: '/design' },
  { label: 'code', to: '/code' },
  { label: 'about/me', to: '/about' },
]

function pickWords() {
  const pool = [...WORDS]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, 5).map(word => `.${word}`)
}

export default function Landing() {
  const block = useRef<HTMLDivElement>(null)
  const [wordCount, setWordCount] = useState(3)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [animation, setAnimation] = useState<AnimationState>(() => ({
    words: pickWords(), shown: 0, phase: 'typing', cycle: 0,
  }))

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setTimeout(() => {
      setAnimation(current => advance(current, wordCount,
        current.phase === 'fading' ? pickWords() : current.words))
    }, delayFor(animation, wordCount))
    return () => window.clearTimeout(timer)
  }, [animation, wordCount, reducedMotion])

  useLayoutEffect(() => {
    const element = block.current
    if (!element) return
    const fit = () => {
      // CSS owns the breakpoint and visible count; resizing never remounts the animation.
      const count = Number(getComputedStyle(element).getPropertyValue('--word-count'))
      setWordCount(count)
      element.style.removeProperty('--typing-size')
      const sample = element.querySelector<HTMLElement>('.typed')
      if (!sample) return
      const preferred = parseFloat(getComputedStyle(sample).fontSize)
      const fits = () => element.scrollHeight <= element.clientHeight + 1 && element.scrollWidth <= element.clientWidth + 1
      if (fits()) return
      // A bounded fallback for unusually long sets: at most seven measurements, never below 24px.
      let low = 24
      let high = Math.max(low, preferred)
      for (let step = 0; step < 6; step++) {
        const middle = (low + high) / 2
        element.style.setProperty('--typing-size', `${middle}px`)
        if (fits()) low = middle
        else high = middle
      }
      element.style.setProperty('--typing-size', `${low}px`)
    }
    const observer = new ResizeObserver(fit)
    observer.observe(element)
    fit()
    return () => observer.disconnect()
  }, [animation.words])

  let preceding = 0
  return (
    <section className="landing landing-centered" style={{ '--set-fade': `${FADE_MS}ms` } as CSSProperties}>
      <div className="landing-shell">
        <div className="landing-brand-group">
          <div className="landing-brand"><Link to="/photo?f=featured" aria-label="Daniel LeVert photography">DANIELLEVERT.</Link></div>
          <div className="landing-tagline">ENGINEER + CREATIVE</div>
        </div>
        <nav className="landing-nav" aria-label="Primary">
          {NAV_ITEMS.map(item => <Link key={item.to} className="landing-nav-link" to={item.to}>{item.label}</Link>)}
        </nav>
        <p className="sr-only">Daniel LeVert — engineer and creative. Photography, filmmaking, design, and code.</p>
        <div ref={block} className={`typing-block ${animation.phase === 'fading' && !reducedMotion ? 'fade-out' : ''}`} aria-hidden="true" lang="en">
          {animation.words.map(word => {
            const shown = reducedMotion ? word.length : Math.max(0, animation.shown - preceding)
            preceding += word.length
            const decorated = `.${(BREAKS[word.slice(1)] ?? word.slice(1)).replace(/-/g, '\u00ad')}`
            let letters = 0
            return <div className="typing-line" key={word}><span className="typed">
              {Array.from(decorated).map((letter, index) => {
                if (letter !== '\u00ad') letters++
                return <span key={index} className={letters > shown ? 'typing-unrevealed' : undefined}>{letter}</span>
              })}
            </span></div>
          })}
        </div>
      </div>
    </section>
  )
}
