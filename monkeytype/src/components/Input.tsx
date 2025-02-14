import { useEffect } from 'react'
import { BLOCKED_KEYS } from "../consts"
import { useWordsStore } from '../store/words'
import { useReferencesStore } from '../store/references'

export const Input = () => {
  const words = useWordsStore(state => state.words)
  const iWord = useWordsStore(state => state.iWord)
  const iLetter = useWordsStore(state => state.iLetter)
  const handleBackspace = useWordsStore(state => state.prevLetter)
  const nextLetter = useWordsStore(state => state.nextLetter)
  const handleSpace = useWordsStore(state => state.handleSpace)
  const setStartTime = useWordsStore(state => state.setStartTime)

  const wordsRef = useReferencesStore(state => state.wordsRef)
  const caretRef = useReferencesStore(state => state.caretRef)
  const inputRef = useReferencesStore(state => state.inputRef)
  
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      const {key, altKey, ctrlKey} = event
      if (BLOCKED_KEYS.includes(key) || altKey || ctrlKey) return

      event.preventDefault()
      inputRef.current!.focus()
    })
  }, [inputRef])

  useEffect(() => {
    const childrenCurrentWord = wordsRef.current?.children[iWord]

    if (!childrenCurrentWord) return
    
    const isLast = childrenCurrentWord?.children.length === iLetter
    
    if (isLast) {
      const currentLetter = childrenCurrentWord.children[iLetter - 1] as HTMLElement
      caretRef.current!.style.left = `${currentLetter.offsetLeft + currentLetter.clientWidth - 4}px`
      return
    }
    
    const currentLetter = childrenCurrentWord.children[iLetter] as HTMLElement
    caretRef.current!.style.left = `${currentLetter.offsetLeft - 4}px`
    caretRef.current!.style.top = `${currentLetter.offsetTop}px`
  }, [iWord, iLetter, wordsRef, caretRef])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation()

    const {key, altKey, ctrlKey} = event
    if (BLOCKED_KEYS.includes(key) || altKey || ctrlKey) return

    setStartTime()
    const childrenCurrentWord = wordsRef.current!.children[iWord]

    if (key === ' ') {
      if ((words.length - 1) === iWord) return

      inputRef.current!.value = ''
      handleSpace()

      const incorrectWord = childrenCurrentWord.getElementsByClassName('incorrect').length > 0
      const untypedLetter = [...childrenCurrentWord.children].find(item => item.className === '')
      
      if (incorrectWord || untypedLetter) {
        childrenCurrentWord.classList.add('error')
      }

      return
    }

    if (key === 'Backspace') {
      if (iWord === 0 && iLetter === 0) return

      handleBackspace()

      if (iLetter === 0) {
        const prevLetter = childrenCurrentWord.previousElementSibling as HTMLElement
        prevLetter.classList.remove('error')
      } else {
        const prevLetter = childrenCurrentWord.children[iLetter - 1] as HTMLElement
        prevLetter.classList.remove('correct', 'incorrect')
      }

      return
    }

    if (words[iWord].length === iLetter) return

    const currentLetter =childrenCurrentWord.children[iLetter] as HTMLElement

    if (key === words[iWord][iLetter]) {
      currentLetter.classList.add('correct')
    } else {
      currentLetter.classList.add('incorrect')
    }

    nextLetter()
  }
  
  
  return (
    <input ref={inputRef} type="text" autoFocus onKeyDown={handleKeyDown}/>
  )
}