import { useEffect, useState } from 'react'
import { useWordsStore } from '../store/words'

export const Time = () => {
    const startTime = useWordsStore(state => state.startTime)
    const endGame = useWordsStore(state => state.endGame)
    const [time, setTime] = useState(15)

    useEffect(() => {
      if (!startTime) return
  
      console.log('cambio el starttime')
      const interval = setInterval(() => {
        setTime(prev => {
          console.log(prev - 1)
  
          if ((prev - 1) === 0) {
            console.log('termino el tiempo')
            clearInterval(interval)
            endGame()
          }
          return prev - 1
        })
      }, 1000)
  
      return () => {
        console.log('se desmonto')
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