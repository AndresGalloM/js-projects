import './App.css'
import data from '../languages/english.json'
import { useEffect, useRef, useState } from 'react'

const blockedKeys = ['Escape', 'Control', 'Alt', 'Enter', 'Shift', 'CapsLock', 'Tab', 'ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
let time = 15

function App() {
  const [words, setWords] = useState<string[]>([])
  const [word, setWord] = useState(0)
  const [letter, setLetter] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const caretRef = useRef<HTMLDivElement | null>(null)

  const getWords = () => {
    return data.sort(() => Math.random() - 0.5).slice(0, 20)
  }

  useEffect(() => {  
    setWords(getWords())

    document.addEventListener('keydown', (event) => {
      const {key, altKey, ctrlKey} = event
      if (blockedKeys.includes(key) || altKey || ctrlKey) return

      event.preventDefault()
      console.log('key')
      inputRef.current!.focus()
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(time)
      time--

      if (time === 0) {
        console.log('termino el tiempo')
        clearInterval(interval)
      }
    }, 1000)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation()

    // console.log(event)
    const {key, altKey, ctrlKey} = event
    if (blockedKeys.includes(key) || altKey || ctrlKey) return

    if (key === ' ') {
      if ((words.length - 1) === word) return

      inputRef.current!.value = ''
      setWord(prev => prev + 1)
      setLetter(0)

      const wrongWord = wordsRef.current?.children[word].getElementsByClassName('incorrect').length > 0
      const iswrongWord = [...wordsRef.current?.children[word].children].find(item => item.className === '')
      
      if (wrongWord || iswrongWord) {
        wordsRef.current?.children[word].classList.add('error')
      }

      const nextWord = wordsRef.current?.children[word + 1] as HTMLElement
      caretRef.current!.style.left = `${nextWord.offsetLeft - 4}px`
      caretRef.current!.style.top = `${nextWord.offsetTop}px`

      return
    }

    if (key === 'Backspace') {
      if (word === 0 && letter === 0) return

      setLetter(prev => {
        if (prev === 0) {
          const prevLetter = wordsRef.current?.children[word - 1] as HTMLElement
          prevLetter.classList.remove('error')
          caretRef.current!.style.left = `${prevLetter.lastElementChild!.offsetLeft + prevLetter.lastElementChild!.clientWidth - 4}px`
          caretRef.current!.style.top = `${prevLetter.lastElementChild!.offsetTop}px`
          setWord(p => p === 0 ? p : p - 1)
          return prevLetter.childElementCount
        }

        const prevLetter = wordsRef.current?.children[word].children[prev - 1] as HTMLElement
        prevLetter.classList.remove('correct', 'incorrect')
        caretRef.current!.style.left = `${prevLetter.offsetLeft - 4}px`
        return prev - 1
      })
      return
    }

    if (words[word].length === letter) return

    const currentLetter = wordsRef.current?.children[word].children[letter] as HTMLElement
    caretRef.current!.style.left = `${currentLetter.offsetLeft + currentLetter.clientWidth - 4}px`

    if (key === words[word][letter]) {
      currentLetter.classList.add('correct')
    } else {
      currentLetter.classList.add('incorrect')
    }

    setLetter(prev => prev < words[word].length ? prev + 1 : prev)
  }

  return (
    <main>
      <section className='typing'>
        <div className='out-focus'>
          <span>Press any key to focus</span>
        </div>
        {/* <small>{word} / {words.length}</small> */}
        <div className='text'>
          <div className='caret' ref={caretRef}></div>
          <div className='words' ref={wordsRef}>
            {
              words.map((w, wIndex) => {
                const letters = w.split('')

                return (
                  <p className='word' key={wIndex}>
                    {
                      letters.map((l, lIndex) => {
                        return (
                          <span key={lIndex}>{l}</span>
                        )
                      })
                    }
                  </p>
                )
              })
            }
          </div>
        </div>
        <input ref={inputRef} type="text" autoFocus onKeyDown={handleKeyDown}/>
      </section>
    </main>
  )
}

export default App
