import { Priority, TodoFormProps } from '../type.d'
import { useForm } from '../hooks/useForm'

const PRIORITIES = {
  [Priority.high]: {
    literal: 'High', 
    cls: 'border-red-600 bg-red-100 dark:border-red-500 dark:bg-red-950',
    clsInput: 'border border-red-600 dark:border-red-500 before:bg-red-500'
  },
  [Priority.normal]: {
    literal: 'Normal', 
    cls: 'border-yellow-600 bg-yellow-100 dark:border-yellow-500 dark:bg-yellow-950',
    clsInput: 'border border-yellow-600 dark:border-yellow-500 before:bg-yellow-500'
  },
  [Priority.low]: {
    literal: 'Low', 
    cls: 'border-green-600 bg-green-100 dark:border-green-500 dark:bg-green-950',
    clsInput: 'border border-green-600 dark:border-green-500 before:bg-green-500'
  }
} as const

interface Props {
  addTodo: (formTodo: TodoFormProps) => void;
}

export const CreateTodo = ({ addTodo }: Props) => {
  const { formRef, createTodo, titleLength, setTitleLength, currentDate, error } = useForm({ addTodo })

  return (
    <section className="mb-12">
      <form ref={formRef} className="w-full flex flex-col gap-3 items-center bg-yello" onSubmit={createTodo}>
        <div className="flex flex-col gap-1 w-full max-w-[500px]">
          <small className="text-gray-700 dark:text-gray-300 self-end pr-2">{titleLength}/255</small>
          <textarea
            autoFocus
            rows={1}
            className="py-1 px-3 field-sizing-content resize-none border rounded-md text-lg border-gray-400 dark:border-gray-800 placeholder:italic" 
            name="title"
            placeholder="Add a new task"
            onChange={(e) => {setTitleLength(e.target.value.length)}}
          ></textarea>
        </div>

        <div className="flex gap-3">
          {Object.entries(PRIORITIES).map(([ key, { literal, cls, clsInput } ]) => {
 
            return (
              <label key={key} className={`cursor-pointer flex items-center gap-2 px-3 py-0.5 rounded-md border hover:scale-105 duration-300 ${cls}`}>
                {literal}
                {
                  key === 'low'
                    ? <input className={clsInput} type="radio" value={key} name="priority" defaultChecked/> 
                    : <input className={clsInput} type="radio" value={key} name="priority"/>
                }
              </label>
            )
          })}
        </div>

        <label className="flex flex-col">
          Due Date:
          <input 
            name="duedate"
            className="mb-4 px-3 py-1 border rounded-md border-gray-400 dark:border-gray-800" 
            type="date"
            min={currentDate}
          />
        </label>

        <button
          className="font-semibold px-4 py-1.5 rounded-md border border-gray-400 dark:border-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-700"
        >
          Add new Task
        </button>

        <div className="h-1">
          <p className="text-red-500 italic block">
            {error}
          </p>
        </div>
      </form>
    </section>
  )
}