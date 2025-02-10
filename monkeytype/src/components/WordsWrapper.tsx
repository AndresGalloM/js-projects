import { RefObject } from 'react'
import { useWordsStore } from '../store/words'

interface Props {
  caretRef: RefObject<HTMLDivElement>
  wordsRef: RefObject<HTMLDivElement>
}

export const WordsWrapper = ({caretRef, wordsRef}: Props) => {
  const words = useWordsStore(state => state.words)

  return (
    <div className='text'>
      <div className='caret' ref={caretRef}></div>
      <div className='words' ref={wordsRef}>
        {
          words.map((word, wIndex) => {
            const letters = word.split('')

            return (
              <p className='word' key={wIndex}>
                {
                  letters.map((letter, lIndex) => {
                    return (
                      <span key={lIndex}>{letter}</span>
                    )
                  })
                }
              </p>
            )
          })
        }
      </div>
    </div>
  )
}