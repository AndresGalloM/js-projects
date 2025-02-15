import { create } from 'zustand'
import data from '../../languages/english.json'

interface Stats {
  [Stat.corrects]: number;
  [Stat.incorrects]: number;
  [Stat.missed]: number;
}

export enum Stat {
  corrects = 'correct',
  incorrects = 'incorrect',
  missed = 'missed'
}

type updateParams = {
  property: Stat,
  amount?: number
  direction?: boolean
}

interface Store {
  stats: Stats
  startTime: boolean
  playing: boolean
  words: string[]
  iWord: number
  iLetter: number
  getWords: () => void
  prevLetter: () => void
  nextLetter: () => void
  handleSpace: () => void
  reload: () => void
  setStartTime: () => void
  endGame: () => void
  updateStats: (params: updateParams) => void
}

const initStats = {
  correct: 0,
  incorrect: 0,
  missed: 0
}

export const useWordsStore = create<Store>()((set, get) => ({
  stats: initStats,
  startTime: false,
  playing: false,
  words: [],
  iWord: 0,
  iLetter: 0,
  getWords: () => {
    const newWords = data.sort(() => Math.random() - 0.5).slice(0, 30)
    set({words: newWords, playing: true})
  },
  prevLetter: () => {
    const {words, iWord, iLetter} = get()

    if (iLetter === 0) {
      set(() => ({
        iWord: iWord - 1,
        iLetter: words[iWord - 1].length
      }))
      return
    }

    set(() => ({
      iLetter: iLetter - 1
    }))
  },
  nextLetter: () => {
    const {words, iWord, iLetter, endGame} = get()

    if ((words.length - 1) === iWord && (words[iWord].length - 1) === iLetter) {
      endGame()
    }

    set(() => ({
      iLetter: iLetter < words[iWord].length ? iLetter + 1 : iLetter
    }))
  },
  handleSpace: () => {
    const {iWord} = get()
    set(() => ({
      iWord: iWord + 1,
      iLetter: 0
    }))
  },
  reload: () => {
    set(() => ({
      stats: initStats,
      startTime: false,
      words: [],
      iWord: 0,
      iLetter: 0
    }))

    const {getWords} = get()
    getWords()
  },
  setStartTime: () => set({startTime: true}),
  endGame: () => set({playing: false}),
  updateStats: ({property, amount = 1, direction = true}) => {
    set(({stats}) => ({
      stats: {
        ...stats,
        [property]: stats[property] + (direction ? amount : -amount)
      }
    }))
  }
}))