import { useState } from 'react'
import { mockTodos } from '../mocks/todos'
import { FILTERS_BUTTONS, FilterValue, Todo, TodoFormProps } from '../type.d'

export const useTodo = () => {
  const [ todos, setTodos ] = useState<Todo[]>(mockTodos)
  const [ filter, setFilter ] = useState<FilterValue>(FILTERS_BUTTONS.ALL.key)
 
  const handleFilterChange = (newFilter: FilterValue) => {
    setFilter(newFilter)
  }
  
  const handleCompleted = (id: string, completed: boolean) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed }
      }

      return todo
    })

    setTodos(updatedTodos)
  }

  const addTodo = (formTodo: TodoFormProps) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
     ...formTodo,
     completed: false
    }
    
    setTodos([ ...todos, newTodo ])
  }

  const removeTodo = (id: string) => {
    const deletedTodo = todos.filter(todo => todo.id !== id)

    setTodos(deletedTodo)
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === FILTERS_BUTTONS.ACTIVE.key) return !todo.completed

    if (filter === FILTERS_BUTTONS.COMPLETED.key) return todo.completed

    return true
  })

  return { 
    todos: filteredTodos,
    filter,
    handleFilterChange,
    handleCompleted, 
    addTodo, 
    removeTodo 
  }
}