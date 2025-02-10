import { create } from 'zustand'
import data from '../../languages/english.json'


interface Store {
  words: string[]
  iWord: number
  iLetter: number
  getWords: () => void
  prevLetter: () => void
  nextLetter: () => void
  handleSpace: () => void
}

export const useWordsStore = create<Store>()((set, get) => ({
  words: [],
  iWord: 0,
  iLetter: 0,
  getWords: () => {
    const newWords = data.sort(() => Math.random() - 0.5).slice(0, 20)
    set({words: newWords})
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
    const {words, iWord, iLetter} = get()
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
  }
}))