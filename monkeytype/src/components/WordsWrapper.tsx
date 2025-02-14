import { useWordsStore } from '../store/words'
import { useReferencesStore } from '../store/references'
import { useEffect } from 'react'

export const WordsWrapper = () => {
  const words = useWordsStore(state => state.words)

  const wordsRef = useReferencesStore(state => state.wordsRef)
  const caretRef = useReferencesStore(state => state.caretRef)

  useEffect(() => {
    if (!wordsRef.current) return

    const childrenWords = [...wordsRef.current.children]

    childrenWords.forEach(word => {
      word.classList.remove('error')

      const childrenWord = [...word.children]
      childrenWord.forEach(letter => {
        letter.classList.remove('correct', 'incorrect')
      })
    })
  }, [words, wordsRef])

  return (
    <div className='text'>
      <div className='out-focus'>
        <span>Press any key to focus</span>
      </div>
      <div className='caret' ref={caretRef}></div>
      <div className='words' ref={wordsRef}>
        {
          words.map((word, wIndex) => {
            const letters = word.split('')

            return (
              <p key={wIndex} className='word'>
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