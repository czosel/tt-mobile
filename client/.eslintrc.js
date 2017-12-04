module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true
  },
  settings: {
    react: {
      pragma: 'h'
    }
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
  rules: {
    'react/react-in-jsx-scope': false,
    'react/prop-types': false,
    'react/no-unknown-property': [2, { ignore: ['class'] }],
    'prettier/prettier': ['error', { singleQuote: true, semi: false }]
  }
}
