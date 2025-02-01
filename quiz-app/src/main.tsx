import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import { ColorModeProvider } from '@/components/ui/color-mode.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@/theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
)
