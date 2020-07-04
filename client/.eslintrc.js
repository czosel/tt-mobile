module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
  },
  globals: {
    process: true,
  },
  settings: {
    react: {
      pragma: "h",
      version: "detect",
    },
  },
  plugins: ["prettier"],
  extends: ["eslint:recommended", "prettier", "plugin:react/recommended"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/no-unknown-property": [2, { ignore: ["class"] }],
    "prettier/prettier": 2,
  },
};
