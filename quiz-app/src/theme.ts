import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: '#f5f5f5', _dark: '#171717' },
          },
          subtle: {
            value: { _light: '{colors.gray.50}', _dark: '#1a1a1a' },
          },
          muted: {
            value: { _light: '{colors.gray.200}', _dark: '#262626' },
          },
          ghost: {
            value: { _light: '{colors.gray.200}', _dark: '#262626' },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: '{colors.black}', _dark: '#e5e5e5' },
          },
          muted: {
            value: { _light: '{colors.gray.600}', _dark: '#a3a3a3' },
          },
        },
        border: {
          DEFAULT: {
            value: { _light: '{colors.gray.200}', _dark: '#404040' },
          },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
