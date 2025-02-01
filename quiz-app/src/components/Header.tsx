import {
  createListCollection,
  Flex,
  HStack,
} from '@chakra-ui/react'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { LANGUAGES } from '@/const'
import { useStore } from '@/store/store'
import { Language } from '@/type'
import { Theme } from '@/components/Theme'

const languages = createListCollection({
  items: Object.values(LANGUAGES),
})

export const Header = () => {
  const language = useStore((state) => state.language)
  const changeLanguage = useStore((state) => state.changeLanguage)

  return (
    <HStack as="header" py="4" justifyContent="space-between">
      <SelectRoot
        variant="subtle"
        size="md"
        collection={languages}
        maxWidth={160}
        defaultValue={[language]}
        onValueChange={(e) => changeLanguage(e.value[0] as Language)}
      >
        <SelectLabel>
          Select Language
        </SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select language">
            {(items) => {
              const item = items[0]

              return (
                <Flex gap={2} alignItems="center">
                  <item.icon width="16px" />
                  {item.label}
                </Flex>
              )
            }}
          </SelectValueText>
        </SelectTrigger>
        <SelectContent bg="bg">
          {languages.items.map((language) => (
            <SelectItem item={language} key={language.value}>
              <Flex gap={2} alignItems="center">
                <language.icon />
                {language.label}
              </Flex>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      <Theme />
    </HStack>
  )
}
