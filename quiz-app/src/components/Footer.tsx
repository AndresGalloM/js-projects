import { useStore } from '@/store/store'
import { Box, Button, Flex, HStack, Status, Text } from '@chakra-ui/react'

export const Footer = () => {
  const questions = useStore((state) => state.questions)
  const reset = useStore((state) => state.reset)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((question) => {
    const { userAnswer, correctAnswer } = question

    if (userAnswer === undefined) unanswered++
    else if (userAnswer === correctAnswer) correct++
    else incorrect++
  })

  return (
    <Flex direction="column" as="footer" justify="center" gap={4} mt={2}>
      <Box>
        <HStack gap={4}>
          <Status.Root colorPalette="green">
            <Status.Indicator />
            <Text opacity={0.7} fontStyle="italic">
              {correct}
              {' '}
              Corrects
            </Text>
          </Status.Root>
          <Status.Root colorPalette="red">
            <Status.Indicator />
            <Text opacity={0.7} fontStyle="italic">
              {incorrect}
              {' '}
              Incorrects
            </Text>

          </Status.Root>
          <Status.Root colorPalette="blue">
            <Status.Indicator />
            <Text opacity={0.7} fontStyle="italic">
              {unanswered}
              {' '}
              Unanswered
            </Text>
          </Status.Root>
        </HStack>
      </Box>
      <Box alignSelf="center">
        <Button
          variant="ghost"
          colorPalette="cyan"
          size="sm"
          onClick={reset}
        >
          Reset Game
        </Button>
      </Box>
    </Flex>
  )
}
