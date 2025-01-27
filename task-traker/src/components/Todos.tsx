import { DueDateType, Todo } from '../type.d'
import { DueDate } from './DueDate'
import { Square, SquareCheckIcon, TrashIcon } from './icons'

interface Props {
  todos: Todo[];
  handleCompleted: (id: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
}

export const Todos = ({ todos, handleCompleted, removeTodo }: Props) => {
  return (
    <section className="flex justify-center">
      <ul className="flex flex-col gap-4 w-full max-w-[500px]">
        {todos.map(todo => {
          const { id, title, completed, priority, dueDate } = todo
          
          return (
            <li key={id} className="flex gap-3 items-center group has-checked:opacity-60">
              <label className="self-start">
                <input 
                  type="checkbox"
                  className="hidden"
                  defaultChecked={completed}
                  onChange={(e) => {handleCompleted(id, e.target.checked)}}
                />

                <div className={'cursor-pointer'}>
                  {
                    completed 
                    ? <SquareCheckIcon className="size-6" />
                    : <Square className="size-6" /> 
                  }
                </div>
              </label>

              <section className="flex-1">
                <h2 className="font-semibold group-has-checked:line-through">{title}</h2>

                <footer className="flex gap-3 justify-between items-start">
                  <div className="flex gap-2 opacity-80">
                    <DueDate dueDate={dueDate as DueDateType} /> |
                    <small className="italic">{priority}</small>
                  </div>

                  <button className="cursor-pointer hover:underline" onClick={() => {removeTodo(id)}}>
                    <small className="flex gap-1 items-center italic">
                      Delete <TrashIcon className="size-3.5" />
                    </small>
                  </button>
                </footer>
              </section>

              {/* 
                <button className="self-start">
                  <TrashIcon className="size-7" />
                </button> 
              */}
            </li>  
          )
        })}
      </ul>
    </section>
  )
}