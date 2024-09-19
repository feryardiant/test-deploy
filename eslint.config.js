'use strict'

import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: ['tests/reports/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)
