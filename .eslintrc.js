// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'tailwindcss', "import", "unused-imports"],
  rules: {
    'no-useless-escape': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/prop-types': 'off',
    'react/no-children-prop': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        'pathGroupsExcludedImportTypes': ['builtin'],
        'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
        'pathGroups': [
          {
            'pattern': 'src/**',
            'group': 'internal',
            'position': 'before'
          }
        ]
      }
    ]
  },
}
