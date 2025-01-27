import { DueDateType } from '../type.d'
import { format } from '@formkit/tempo'

interface Props {
  dueDate: DueDateType;
}

export const DueDate = ({ dueDate }: Props) => {
  if (!dueDate) {
    return (
      <small>
        No due date
      </small>
    )
  }

  const date = format(dueDate as string, 'medium', 'en')

  // const date = dueDate
  // const day = date.getDate()
  // const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)
  // const year = date.getFullYear()

  return (
    <small>
      {
        `Due Date: ${date}`
      }
    </small>
  )
}