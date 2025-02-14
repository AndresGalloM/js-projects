import { create } from 'zustand'
import data from '../../languages/english.json'

interface Store {
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
}

export const useWordsStore = create<Store>()((set, get) => ({
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
      startTime: false,
      words: [],
      iWord: 0,
      iLetter: 0
    }))

    const {getWords} = get()
    getWords()
  },
  setStartTime: () => set({startTime: true}),
  endGame: () => set({playing: false})
}))