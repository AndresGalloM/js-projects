import { RefObject, useEffect } from 'react'
import { BLOCKED_KEYS } from "../consts"
import { useWordsStore } from '../store/words'

interface Props {
  inputRef: RefObject<HTMLInputElement>
  caretRef: RefObject<HTMLDivElement>
  wordsRef: RefObject<HTMLDivElement>
}

export const Input = ({inputRef, caretRef, wordsRef}: Props) => {
  const words = useWordsStore(state => state.words)
  const iWord = useWordsStore(state => state.iWord)
  const iLetter = useWordsStore(state => state.iLetter)
  const handleBackspace = useWordsStore(state => state.prevLetter)
  const nextLetter = useWordsStore(state => state.nextLetter)
  const handleSpace = useWordsStore(state => state.handleSpace)

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

    const childrenCurrentWord = wordsRef.current!.children[iWord]

    if (key === ' ') {
      if ((words.length - 1) === iWord) return

      inputRef.current!.value = ''
      handleSpace()

      const wrongWord = childrenCurrentWord.getElementsByClassName('incorrect').length > 0
      const iswrongWord = [...childrenCurrentWord.children].find(item => item.className === '')
      
      if (wrongWord || iswrongWord) {
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