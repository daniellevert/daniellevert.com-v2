import { type CSSProperties, type RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  advance,
  delayFor,
  FADE_MS,
  type AnimatedWord,
  type AnimationState,
} from '../lib/landingAnimation'

const EXPANDED_QUERY = '(max-width: 640px) and (min-height: 501px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const WORDS: AnimatedWord[] = [
  { value: 'creative', display: 'crea-tive' },
  { value: 'thinker', display: 'think-er' },
  { value: 'coder', display: 'cod-er' },
  { value: 'engineer', display: 'en-gi-neer' },
  { value: 'artist', display: 'art-ist' },
  { value: 'photographer', display: 'pho-tog-ra-pher' },
  { value: 'filmmaker', display: 'film-mak-er' },
  { value: 'storyteller', display: 'sto-ry-tell-er' },
  { value: 'editor', display: 'ed-i-tor' },
  { value: 'curious', display: 'cu-ri-ous' },
  { value: 'disciplined', display: 'dis-ci-plined' },
  { value: 'playful', display: 'play-ful' },
  { value: 'builder', display: 'build-er' },
  { value: 'writer', display: 'writ-er' },
  { value: 'designer', display: 'de-sign-er' },
  { value: 'actor', display: 'ac-tor' },
]

const NAV_ITEMS = [
  { label: 'photo', to: '/photo?f=featured' },
  { label: 'video', to: '/video' },
  { label: 'design', to: '/design' },
  { label: 'code', to: '/code' },
  { label: 'about/me', to: '/about' },
]

function pickWords(): AnimatedWord[] {
  const pool = [...WORDS]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, 5)
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

function useLandingAnimation(wordCount: number, reducedMotion: boolean): AnimationState {
  const [animation, setAnimation] = useState<AnimationState>(() => ({
    words: pickWords(),
    shown: 0,
    phase: 'typing',
    cycle: 0,
  }))

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setTimeout(() => {
      setAnimation(current => advance(
        current,
        wordCount,
        current.phase === 'fading' ? pickWords() : current.words,
      ))
    }, delayFor(animation, wordCount))
    return () => window.clearTimeout(timer)
  }, [animation, wordCount, reducedMotion])

  return animation
}

function useWordFit(block: RefObject<HTMLDivElement>, words: AnimatedWord[]): void {
  useLayoutEffect(() => {
    const element = block.current
    if (!element) return

    const fit = () => {
      element.style.removeProperty('--typing-size')
      const sample = element.querySelector<HTMLElement>('.typed')
      if (!sample) return

      const preferred = parseFloat(getComputedStyle(sample).fontSize)
      const fits = () => (
        element.scrollHeight <= element.clientHeight + 1
        && element.scrollWidth <= element.clientWidth + 1
      )
      if (fits()) return

      const minimum = 24
      element.style.setProperty('--typing-size', `${minimum}px`)
      if (!fits()) return

      let low = minimum
      let high = Math.max(minimum, preferred)
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
  }, [block, words])
}

export default function Landing() {
  const block = useRef<HTMLDivElement>(null)
  const expanded = useMediaQuery(EXPANDED_QUERY)
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY)
  const wordCount = expanded ? 5 : 3
  const animation = useLandingAnimation(wordCount, reducedMotion)
  useWordFit(block, animation.words)

  return (
    <section
      className={`landing landing-centered ${expanded ? 'landing--expanded' : ''}`}
      style={{ '--set-fade': `${FADE_MS}ms` } as CSSProperties}
    >
      <div className="landing-shell">
        <div className="landing-brand-group">
          <div className="landing-brand">
            <Link to="/photo?f=featured" aria-label="Daniel LeVert photography">DANIELLEVERT.</Link>
          </div>
          <div className="landing-tagline">ENGINEER + CREATIVE</div>
        </div>
        <nav className="landing-nav" aria-label="Primary">
          {NAV_ITEMS.map(item => (
            <Link key={item.to} className="landing-nav-link" to={item.to}>{item.label}</Link>
          ))}
        </nav>
        <p className="sr-only">
          Daniel LeVert — engineer and creative. Photography, filmmaking, design, and code.
        </p>
        <TypingWords
          block={block}
          animation={animation}
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  )
}

type TypingWordsProps = {
  block: RefObject<HTMLDivElement>
  animation: AnimationState
  reducedMotion: boolean
}

function TypingWords({ block, animation, reducedMotion }: TypingWordsProps) {
  let preceding = 0

  return (
    <div
      ref={block}
      className={`typing-block ${animation.phase === 'fading' && !reducedMotion ? 'fade-out' : ''}`}
      aria-hidden="true"
      lang="en"
    >
      {animation.words.map(word => {
        const wordLength = word.value.length + 1
        const shown = reducedMotion ? wordLength : Math.max(0, animation.shown - preceding)
        preceding += wordLength
        const decorated = `.${word.display.replace(/-/g, '\u00ad')}`
        let letters = 0

        return (
          <div className="typing-line" key={word.value}>
            <span className="typed">
              {Array.from(decorated).map((letter, index) => {
                if (letter !== '\u00ad') letters++
                return (
                  <span key={index} className={letters > shown ? 'typing-unrevealed' : undefined}>
                    {letter}
                  </span>
                )
              })}
            </span>
          </div>
        )
      })}
    </div>
  )
}
