export const TYPE_MS = 40
export const LINE_PAUSE_MS = 200
export const FADE_MS = 450

export type AnimationState = {
  words: string[]
  shown: number
  phase: 'typing' | 'holding' | 'fading'
  cycle: number
}

export function visibleLength(words: string[], count: number) {
  return words.slice(0, count).join('').length
}

export function advance(state: AnimationState, count: number, nextWords: string[]): AnimationState {
  const length = visibleLength(state.words, count)
  if (state.shown < length) return { ...state, shown: state.shown + 1, phase: 'typing' }
  if (state.phase === 'typing') return { ...state, shown: length, phase: 'holding' }
  if (state.phase === 'holding') return { ...state, phase: 'fading' }
  return { words: nextWords, shown: 0, phase: 'typing', cycle: (state.cycle + 1) % 3 }
}

export function delayFor(state: AnimationState, count: number) {
  if (state.shown < visibleLength(state.words, count)) {
    let boundary = 0
    const atLineEnd = state.words.slice(0, count).some(word => {
      boundary += word.length
      return boundary === state.shown
    })
    return atLineEnd ? LINE_PAUSE_MS : TYPE_MS
  }
  if (state.phase === 'holding') return state.cycle === 2 ? 5200 : 2600
  return state.phase === 'fading' ? FADE_MS : LINE_PAUSE_MS
}
