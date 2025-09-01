export type VideoKind = 'commercial' | 'short' | 'other'

export type VideoItem = {
  id: string
  title: string
  kind: VideoKind
  url: string
  description?: string
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'marys-story',
    title: 'Mary\'s Story (No Adults Left Behind)',
    kind: 'short',
    url: 'https://vimeo.com/351244097',
    description: 'A short telling Mary\'s story on how No Adults Left Behind made a difference in her life.'
  },
  {
    id: 'fratellos-1',
    title: 'Eat, Drink, Enjoy | Fratello\'s',
    kind: 'commercial',
    url: 'https://vimeo.com/226242523',
    description: 'Ad created for Illinois restaurant Fratello\'s in 2017.'
  },
  {
    id: 'fratellos-2',
    title: 'Two Sides | Fratello\'s',
    kind: 'commercial',
    url: 'https://vimeo.com/226242300',
    description: 'Ad created for Illinois restaurant Fratello\'s in 2017.'
  }
]
