import { Priority, Todo } from '../type.d'

export const mockTodos: Todo[] = [
  {
    id: '4f63f0f4-de7a-4cce-9c63-a262801e574c',
    title: 'Refactor the existing codebase to follow the SOLID principles and improve maintainability',
    completed: false,
    priority: Priority.high,
    dueDate: '2025-01-25'
  },
  {
    id: '4e19dbbc-a4dd-44e2-9674-a0bc74c75941',
    title: 'Complete the online course on full-stack development with React',
    completed: true,
    priority: Priority.normal
  },
  {
    id: '032efee6-1352-46e7-8a30-c7fee59a588a',
    title: 'Read the comprehensive guide to advanced TypeScript types',
    completed: false,
    priority: Priority.low,
    dueDate: '2025-01-30'
  }
]