import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

const styles = stylistic.configs.customize({
     indent: 2,
     quotes: 'single',
     semi: false,
     jsx: true,
     arrowParens: true,
     braceStyle: '1tbs',
     blockSpacing: true,
     quoteProps: 'as-needed',
})

export default tseslint.config(
     { ignores: ['dist'] },
     {
          extends: [js.configs.recommended, ...tseslint.configs.recommended, styles],
          files: ['**/*.{ts,tsx}'],
          languageOptions: {
               ecmaVersion: 2020,
               globals: globals.browser,
          },
          plugins: {
               'react-hooks': reactHooks,
               'react-refresh': reactRefresh,
          },
          rules: {
               '@stylistic/max-len': ["error", { "code": 100 }],
               ...reactHooks.configs.recommended.rules,
               'react-refresh/only-export-components': [
                    'warn',
                    { allowConstantExport: true },
               ],
          },
     },
)
