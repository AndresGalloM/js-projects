import { z } from 'zod'
import { Priority } from '../type.d'
import { format, parse } from '@formkit/tempo'

export const todoSchema = (currentDate: string) => z.object({
  title: z.string().min(1, 'Task must contain at least 1 character(s)').max(255, 'Task must contain at most 255 character(s)'),
  priority: z.nativeEnum(Priority),
  dueDate: z.date().min(parse(
    {
      date: currentDate,
      format: 'YYYY-MM-DD',
      locale: 'en'
    }
  ), `Date must be greater than or equal to ${format(currentDate, 'medium', 'en')}`).optional()
})