import { test } from 'node:test'
import assert from 'node:assert/strict'
import { advance, delayFor, FADE_MS, LINE_PAUSE_MS } from '../src/lib/landingAnimation.ts'

const words = ['.one', '.two', '.three', '.four', '.five']
const initial = () => ({ words, shown: 0, phase: 'typing', cycle: 0 })

test('types visible words, holds, fades, and starts the next set', () => {
  let state = initial()
  const length = words.slice(0, 3).join('').length
  for (let i = 0; i < length; i++) state = advance(state, 3, words)
  assert.equal(state.shown, length)
  state = advance(state, 3, words)
  assert.equal(state.phase, 'holding')
  assert.equal(delayFor(state, 3), 2600)
  state = advance(state, 3, words)
  assert.equal(state.phase, 'fading')
  assert.equal(delayFor(state, 3), FADE_MS)
  state = advance(state, 3, [...words].reverse())
  assert.equal(state.shown, 0)
  assert.equal(state.cycle, 1)
  assert.equal(state.words[0], '.five')
})

test('pauses between words and holds longer on the third cycle', () => {
  assert.equal(delayFor({ ...initial(), shown: 4 }, 3), LINE_PAUSE_MS)
  assert.equal(delayFor({ ...initial(), shown: 14, phase: 'holding', cycle: 2 }, 3), 5200)
})

test('expanding resumes typing without replacing the existing words', () => {
  const state = advance({ ...initial(), shown: 14, phase: 'holding' }, 5, words)
  assert.equal(state.phase, 'typing')
  assert.equal(state.shown, 15)
  assert.equal(state.words, words)
})

test('shrinking completes the visible set without waiting for hidden words', () => {
  const state = advance({ ...initial(), shown: 18 }, 3, words)
  assert.equal(state.phase, 'holding')
  assert.equal(state.shown, 14)
})
