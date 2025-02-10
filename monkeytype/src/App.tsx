import './App.css'
import { useEffect, useRef } from 'react'
import { WordsWrapper } from './components/WordsWrapper'
import { BLOCKED_KEYS } from './consts'
import { Input } from './components/Input'
import { useWordsStore } from './store/words'

let time = 15

function App() {
  const getWords = useWordsStore(state => state.getWords)

  const caretRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {  
    getWords()
  }, [getWords])

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      const {key, altKey, ctrlKey} = event
      if (BLOCKED_KEYS.includes(key) || altKey || ctrlKey) return

      event.preventDefault()
      inputRef.current!.focus()
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      time--

      if (time === 0) {
        console.log('termino el tiempo')
        clearInterval(interval)
      }
    }, 1000)
  }, [])

 
  return (
    <main>
      <section className='typing'>
        <div className='out-focus'>
          <span>Press any key to focus</span>
        </div>
        
        <WordsWrapper caretRef={caretRef} wordsRef={wordsRef} />

        <Input inputRef={inputRef} caretRef={caretRef} wordsRef={wordsRef} />
      </section>
    </main>
  )
}

export default App
