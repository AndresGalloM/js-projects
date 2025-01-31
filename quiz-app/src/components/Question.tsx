import { useStore } from '@/store/store'
import { Question as QuestionType } from '@/type'
import {
  Box,
  Button,
  ColorPalette,
  Flex,
  For,
  Text,
} from '@chakra-ui/react'
import { SyntaxHigh } from './SyntaxHigh'

const getColor = (answerIndex: number, correctAnswer: number, userAnswer: number): ColorPalette => {
  if (answerIndex === correctAnswer) return 'green'
  if (answerIndex === userAnswer) return 'red'
  return 'current'
}

export const Question = ({ qst }: { qst: QuestionType }) => {
  const selectAnswer = useStore((state) => state.selectAnswer)
  const { id, question, code, answers, userAnswer, correctAnswer } = qst
  const disable = userAnswer !== undefined

  return (
    <>
      <Box>
        <Text as="h2" fontSize={17} fontWeight="semibold">{question}</Text>
      </Box>

      <SyntaxHigh code={code} />

      <Flex direction="column" gap={1} as="ul" pt={2}>
        <For each={answers}>
          {(answer, index) => (
            <li key={index}>
              <Button
                variant={disable ? 'subtle' : 'outline'}
                size="lg"
                width="full"
                onClick={() => selectAnswer(id, index)}
                disabled={disable}
                _disabled={
                  {
                    opacity: 0.85,
                    colorPalette: getColor(index, correctAnswer, userAnswer as number),
                  }
                }
              >
                {answer}
              </Button>
            </li>
          )}
        </For>
      </Flex>
    </>
  )
}
