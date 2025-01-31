import { SYNTAX_LANGUAGES } from '@/const'
import { useStore } from '@/store/store'
import { Box } from '@chakra-ui/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export const SyntaxHigh = ({ code }: { code: string }) => {
  const language = useStore((state) => state.language)

  return (
    <Box>
      <SyntaxHighlighter
        language={SYNTAX_LANGUAGES[language]}
        style={atomOneDark}
        showLineNumbers
        customStyle={{ padding: '1.5rem', borderRadius: '0.5rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  )
}
