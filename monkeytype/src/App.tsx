import './App.css'
import { useEffect } from 'react'
import { WordsWrapper } from './components/WordsWrapper'
import { Input } from './components/Input'
import { useWordsStore } from './store/words'
import { ReloadIcons } from './components/icons'
import { useReferencesStore } from './store/references'
import { Time } from './components/Time'

function App() {
  const playing = useWordsStore(state => state.playing)
  const getWords = useWordsStore(state => state.getWords)
 
  const reload = useWordsStore(state => state.reload)
  const inputRef = useReferencesStore(state => state.inputRef)

  useEffect(() => {
    getWords()
  }, [getWords])

  return (
    <main>
      <section className='typing'>
        {
          playing ? (
            <>            
              <Time />
              <WordsWrapper />
              <Input />
            </>
          ) : (
            <div className='results'>
              <div>
                <p>Words</p>
                <p>15</p>
              </div>
              <div>
                <p>Corrects</p>
                <p>7</p>
              </div>
              <div>
                <p>Incorrects</p>
                <p>3</p>
              </div>
              <div>
                <p>Missed</p>
                <p>2</p>
              </div>
            </div>
          )
        }


        <button className='reload' onClick={() => {
          reload()
          inputRef.current?.focus()
        }}>
          <ReloadIcons width='18px' />
        </button>
      </section>
    </main>
  )
}

export default App
