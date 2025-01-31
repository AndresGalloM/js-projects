import { LANGUAGES } from '@/const'
import { Language, Question } from '@/type'
import { create } from 'zustand'

interface Store {
  language: Language
  questions: Question[]
  currentQuestionIndex: number
  loading: boolean
  fetchQuestions: () => void
  selectAnswer: (questionId: number, answerIndex: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  changeLanguage: (language: Language) => void
  reset: () => void
}

export const useStore = create<Store>()((set, get) => ({
  language: LANGUAGES.JAVASCRIPT.value,
  questions: [],
  currentQuestionIndex: 0,
  loading: false,
  fetchQuestions: async () => {
    set({ loading: true })

    const promise = new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve(fetch(`http://localhost:5173/${get().language}.json`))
      }, 500)
    })

    const result = await promise
    try {
      const data: Question[] = await result.json()
      const newQuestions = data.sort(() => Math.random() - 0.5).slice(0, 10)

      set({ questions: newQuestions })
    } catch {
      console.log('Error')
    } finally {
      set({ loading: false })
    }
  },
  selectAnswer: (questionId: number, answerIndex: number) => {
    const { questions } = get()
    const newQuestions = questions.map((question) => {
      if (question.id === questionId && question.userAnswer === undefined) {
        return { ...question, userAnswer: answerIndex }
      }

      return question
    })

    set({ questions: newQuestions })
  },
  prevQuestion: () => set(() => {
    const index = get().currentQuestionIndex - 1

    if (index < 0) return {}

    return { currentQuestionIndex: index }
  }),
  nextQuestion: () => set(() => {
    const { currentQuestionIndex, questions } = get()
    const index = currentQuestionIndex + 1

    if (index === questions.length) return {}

    return { currentQuestionIndex: index }
  }),
  changeLanguage: (language: Language) => {
    const { fetchQuestions } = get()

    set({ language, currentQuestionIndex: 0, questions: [] })
    fetchQuestions()
  },
  reset: () => {
    const { fetchQuestions } = get()

    set({ questions: [], currentQuestionIndex: 0 })
    fetchQuestions()
  },
}))
