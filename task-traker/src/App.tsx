import { CreateTodo } from './components/CreateTodo'
import { Filters } from './components/Filters'
import { Header } from './components/Header'
import { Todos } from './components/Todos'
import { useTodo } from './hooks/useTodo'

function App() {
  const { 
    todos, 
    filter, 
    handleFilterChange, 
    addTodo, 
    handleCompleted, 
    removeTodo 
  } = useTodo()

  return (
    <main className="container min-h-screen py-4 w-full max-w-5xl">
      <Header />
      <div className="-z-10 w-40 blur-[100px] top-6 h-40 rounded-full bg-blue-400 absolute pointer-events-none select-none md:top-32 left-0"></div>
      <div className="-z-10 w-60 blur-[100px] h-60 rounded-full bg-blue-400 absolute pointer-events-none select-none top-80 md:top-56 right-0"></div>

      <CreateTodo addTodo={addTodo}/>
      <Filters filter={filter} handleFilterChange={handleFilterChange}/>
      <Todos todos={todos} handleCompleted={handleCompleted} removeTodo={removeTodo}/>
    </main>
  )
}

export default App
