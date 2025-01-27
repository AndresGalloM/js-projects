import { parse } from '@formkit/tempo'
import { todoSchema } from '../schemas/todo'
import { FormEvent, useRef, useState } from 'react'
import { useCurrentDate } from './useCurrentDate'
import { Priority, TodoFormProps } from '../type'
import { ZodError } from 'zod'

interface Props {
  addTodo: (formTodo: TodoFormProps) => void;
}

export const useForm = ({ addTodo }: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [ error, setError ] = useState('')
  const { currentDate } = useCurrentDate()
  const [ titleLength, setTitleLength ] = useState(0)

  const createTodo = (event: FormEvent) => {
    event.preventDefault()
    if (!formRef.current) return

    setError('')
    const formData = new FormData(formRef.current)

    const date = formData.get('duedate')
      ? parse({
          date: formData.get('duedate') as string,
          format: 'YYYY-MM-DD',
          locale: 'en'
        })
      : undefined
  
    const newTodo: TodoFormProps = {
      title: formData.get('title') as string,
      priority: formData.get('priority') as Priority,
      dueDate: date
    }

    try {
      todoSchema(currentDate).parse(newTodo)
      newTodo.dueDate = formData.get('duedate') as string || undefined
      addTodo(newTodo)

      formRef.current.reset()
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.issues[0].message)
        return
      }

      setError('Unexpected error')
    }
  }

  return { formRef, createTodo, titleLength, setTitleLength, currentDate, error }
}