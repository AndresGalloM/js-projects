import {
  Center,
  Container,
  Flex,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { useStore } from '@/store/store'
import { useEffect } from 'react'
import {
  TbSquareRoundedArrowLeftFilled,
  TbSquareRoundedArrowRightFilled,
} from 'react-icons/tb'
import { Question } from '@/components/Question'
import { Skeleton } from '@/components/ui/skeleton'
import { Footer } from '@/components/Footer'

function App() {
  const loading = useStore((state) => state.loading)
  const questions = useStore((state) => state.questions)
  const currentQuestionIndex = useStore((state) => state.currentQuestionIndex)
  const fetchQuestions = useStore((state) => state.fetchQuestions)
  const nextQuestion = useStore((state) => state.nextQuestion)
  const prevQuestion = useStore((state) => state.prevQuestion)

  const length = questions.length
  const question = questions[currentQuestionIndex]

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  return (
    <Container as="main" maxWidth="4xl" h="vh">
      <Header />

      <Center as="section">
        <Flex direction="column" py={4} gap={2} maxWidth={500} width="full">
          <Flex align="center" gap={3}>
            <IconButton
              aria-label="Call support"
              variant="ghost"
              size="lg"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <TbSquareRoundedArrowLeftFilled />
            </IconButton>

            <Text fontWeight="bold">
              {currentQuestionIndex + 1}
              {' / '}
              {length}
            </Text>

            <IconButton
              aria-label="Call support"
              variant="ghost"
              size="lg"
              onClick={nextQuestion}
              disabled={currentQuestionIndex === length - 1}
            >
              <TbSquareRoundedArrowRightFilled />
            </IconButton>
          </Flex>

          {loading && (
            <Stack>
              <Skeleton height="30px" />
              <Skeleton height="100px" />
              <Skeleton height="44px" />
              <Skeleton height="44px" />
              <Skeleton height="44px" />
              <Skeleton height="44px" />
            </Stack>
          )}
          {length > 0 && !loading && (
            <>
              <Question qst={question} />
              <Footer />
            </>
          )}
        </Flex>
      </Center>
    </Container>
  )
}

export default App
