import { useEffect, useState } from 'react'

const getCurrentDate = () => {
  const year = new Date(Date.now()).getFullYear()
  const month = (new Date(Date.now()).getMonth() + 1).toString().padStart(2, '0')
  const day = new Date(Date.now()).getDate()

  return `${year}-${month}-${day}`
}

export const useCurrentDate = () => {
  const [ currentDate, setCurrentDate ] = useState(() => getCurrentDate())

  useEffect(() => {
    const interval = setInterval(() => {
      const newCurrentDate = getCurrentDate()
      setCurrentDate(newCurrentDate)
    }, 60000 * 5)

    return () => {
      clearInterval(interval)
    }
  }, [])
  
  return { currentDate }
}