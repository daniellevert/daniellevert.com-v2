import { test } from 'node:test'
import assert from 'node:assert/strict'
import { advance, delayFor, FADE_MS, LINE_PAUSE_MS } from '../src/lib/landingAnimation.ts'

const words = ['one', 'two', 'three', 'four', 'five'].map(value => ({ value, display: value }))
const initial = () => ({ words, shown: 0, phase: 'typing', cycle: 0 })

test('types visible words, holds, fades, and starts the next set', () => {
  let state = initial()
  const length = 14
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
  assert.equal(state.words[0].value, 'five')
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

test('a responsive expansion does not interrupt an active fade', () => {
  const state = { ...initial(), shown: 14, phase: 'fading' }
  const nextWords = [...words].reverse()

  assert.equal(delayFor(state, 5), FADE_MS)
  assert.deepEqual(advance(state, 5, nextWords), {
    words: nextWords,
    shown: 0,
    phase: 'typing',
    cycle: 1,
  })
})
