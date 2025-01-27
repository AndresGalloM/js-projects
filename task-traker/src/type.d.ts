export const FILTERS_BUTTONS = {
  ALL: { key: 'all', label: 'All' },
  COMPLETED: { key: 'completed', label: 'Completed' },
  ACTIVE: { key: 'active', label: 'Active' }
} as const

export enum Priority {
  high = 'high',
  normal = 'normal',
  low = 'low'
}

type TodoPriorityType = 'high' | 'normal' | 'low'

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string | Date;
  priority: Priority;
}

export type DueDateType = Pick<Todo, 'dueDate'>
export type TodoFormProps = Pick<Todo, 'title'  | 'priority' | 'dueDate'>
export type FilterValue = typeof FILTERS_BUTTONS[keyof typeof FILTERS_BUTTONS]['key']