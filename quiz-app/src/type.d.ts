import { LANGUAGES } from '@/const'

export interface Question {
  id: number
  question: string
  code: string
  answers: string[]
  correctAnswer: number
  userAnswer?: number
}

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES]['value']
export type SyntaxLanguages = {
  [key in Required<Language>]: string;
}
