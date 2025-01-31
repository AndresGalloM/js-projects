import { CppIcon, JavascriptIcon, PythonIcon } from './components/icons'
import { SyntaxLanguages } from './type'

export const LANGUAGES = {
  JAVASCRIPT: { value: 'js', label: 'JavaScript', icon: JavascriptIcon },
  PYTHON: { value: 'py', label: 'Python', icon: PythonIcon },
  CPP: { value: 'cpp', label: 'C++', icon: CppIcon },
} as const

export const SYNTAX_LANGUAGES: SyntaxLanguages = {
  py: 'python',
  js: 'javascript',
  cpp: 'cpp',
} as const
