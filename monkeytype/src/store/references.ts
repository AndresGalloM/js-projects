import { createRef, RefObject } from 'react'
import { create } from 'zustand'

interface Store {
  caretRef: RefObject<HTMLDivElement>
  wordsRef: RefObject<HTMLDivElement>
  inputRef: RefObject<HTMLInputElement>
}

export const useReferencesStore = create<Store>()(() => ({
  caretRef: createRef(),
  wordsRef: createRef(),
  inputRef: createRef()
}))