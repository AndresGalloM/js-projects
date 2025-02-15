import { useEffect, useState } from 'react'
import { useWordsStore } from '../store/words'

export const Time = () => {
    const startTime = useWordsStore(state => state.startTime)
    const endGame = useWordsStore(state => state.endGame)
    const [time, setTime] = useState(15)

    useEffect(() => {
      if (!startTime) return
  
      const interval = setInterval(() => {
        setTime(prev => {  
          if ((prev - 1) === 0) {
            clearInterval(interval)
            endGame()
          }
          return prev - 1
        })
      }, 1000)
  
      return () => {
        setTime(15)
        clearInterval(interval)
      }
    }, [startTime, endGame])

  return (
    <>
      <p className='time'>{time}</p>
    </>
  )
}