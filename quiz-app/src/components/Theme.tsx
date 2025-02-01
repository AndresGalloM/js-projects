import { useColorMode, ColorModeButton } from '@/components/ui/color-mode'

export const Theme = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <ColorModeButton size="md" _hover={{ background: 'bg.muted' }} onClick={toggleColorMode} />
  )
}
