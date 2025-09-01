import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Minimal cleanup only — no structural rewrites
 *
 * CHANGES:
 * 1) Keydown listener now ignores modifier/navigation keys so we don't hijack Tab/Escape/etc.
 * 2) Click/touch listener now ignores obvious interactive targets (header.site as before, plus links/buttons/form fields) so real UI still works.
 * 3) Small typing loop guard to bail while `leaving` (prevents stray timers after exit begins).
 * 4) Added tiny comments + kept all timings/behavior the same.
 *
 * NOTE: Ensure your header element has className="site" so header links don't trigger leave.
 */

const GROUPS: string[][] = [
  ['.creative', '.thinker', '.coder'],
  ['.engineer', '.artist', '.photographer'],
  ['.filmmaker', '.storyteller', '.editor'],
  ['.curious', '.disciplined', '.playful'],
  ['.builder', '.writer', '.designer'],
]

const TYPE_MS = 40           // per character
const HOLD_AFTER_LINE = 200  // wait after each line finishes
const HOLD_AFTER_GROUP = 2000 // ~2s after all three lines show
const GROUP_FADE_MS = 500    // sync with CSS fade-out
const LEAVE_FADE_MS = 350    // fade into Photo

export default function Landing() {
  const navigate = useNavigate()
  const groups = useMemo(() => GROUPS, [])
  const [g, setG] = useState(0)                    // which group
  const [typed, setTyped] = useState<[number, number, number]>([0, 0, 0])
  const [line, setLine] = useState(0)              // 0,1,2 typing; 3 = group complete
  const [groupFading, setGroupFading] = useState(false)
  const [leaving, setLeaving] = useState(false)

  // Fade → navigate to Photo
  const beginLeave = () => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => navigate('/photo?f=featured'), LEAVE_FADE_MS)
  }

  // Any interaction -> leave (but allow header nav & obvious controls to work normally)
  useEffect(() => {
    const ignoreKeys = new Set([
      'Shift','Control','Alt','Meta','CapsLock','Tab','Escape',
      'ArrowUp','ArrowDown','ArrowLeft','ArrowRight','PageUp','PageDown','Home','End','Insert','PrintScreen','ScrollLock','Pause'
    ])

    const onKeyDown = (e: KeyboardEvent) => {
      if (ignoreKeys.has(e.key) || e.metaKey || e.ctrlKey || e.altKey || e.isComposing) return
      beginLeave()
    }

    const onPointerStart = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target) return beginLeave()
      // original exception: header.site
      if (target.closest('header.site')) return
      // new: don't hijack real controls
      if (target.closest('a[href], button, [role="button"], input, textarea, select, label')) return
      beginLeave()
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('mousedown', onPointerStart)
    window.addEventListener('touchstart', onPointerStart, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('mousedown', onPointerStart)
      window.removeEventListener('touchstart', onPointerStart)
    }
  }, [leaving])

  // Typing logic (sequential lines, robust loop)
  useEffect(() => {
    if (groupFading || leaving) return

    // If currently typing a line
    if (line <= 2) {
      const text = groups[g][line]
      // keep typing until line complete
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
        // line finished -> hold then advance to next line
        const h = window.setTimeout(() => setLine(l => l + 1), HOLD_AFTER_LINE)
        return () => window.clearTimeout(h)
      }
    }

    // All 3 lines done -> hold then fade out group
    if (line === 3 && !groupFading) {
      const h = window.setTimeout(() => setGroupFading(true), HOLD_AFTER_GROUP)
      return () => window.clearTimeout(h)
    }
  }, [groups, g, line, typed, groupFading, leaving])

  // When group is fading, swap to next group after fade duration
  useEffect(() => {
    if (!groupFading) return
    const t = window.setTimeout(() => {
      setG((gg) => (gg + 1) % groups.length)
      setTyped([0, 0, 0])
      setLine(0)
      setGroupFading(false)
    }, GROUP_FADE_MS)
    return () => window.clearTimeout(t)
  }, [groupFading, groups.length])

  const [t0, t1, t2] = typed
  const [s0, s1, s2] = groups[g]

  return (
    <section className={`landing wrap ${leaving ? 'leave-out' : ''}`}>
      <div className={`typing-block ${groupFading ? 'fade-out' : ''}`} aria-live="polite">
        <TypingLine text={s0} shown={t0} showCursor={line === 0 && t0 < s0.length} />
        <TypingLine text={s1} shown={t1} showCursor={line === 1 && t1 < s1.length} />
        <TypingLine text={s2} shown={t2} showCursor={line === 2 && t2 < s2.length} />
      </div>
      <p className="landing-hint">click or press any key to enter</p>
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
