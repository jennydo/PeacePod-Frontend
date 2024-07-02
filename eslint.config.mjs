import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser
      },
    },
    plugins: {
      react: react,
    },
    rules: {
      // ESLint rules
      "no-unused-vars": "warn",
      "semi": "warn",
      "no-unused-expressions": "warn",

      // React rules (previously provided by eslint-plugin-react/recommended)
      "react/jsx-uses-vars": "error",
      "react/prop-types": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-no-undef": "off",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/no-unknown-property": "error",
      "react/jsx-pascal-case": "error",
      "react/no-direct-mutation-state": "error",
      "react/require-render-return": "error",
      "react/jsx-no-target-blank": "warn",
      "react/no-unused-state": "warn",
      "react/jsx-curly-brace-presence": ["warn", { "props": "never", "children": "never" }],
      "react/self-closing-comp": ["warn", { "component": true, "html": true }],
      "react/no-deprecated": "warn",
      "react/no-array-index-key": "warn",
      "react/jsx-props-no-spreading": "warn", // This is opinionated, adjust as needed
      "react/no-unescaped-entities": "warn",
      "react/jsx-max-props-per-line": ["warn", { "maximum": 3 }],
      "react/jsx-sort-props": ["warn", {
        "callbacksLast": true,
        "shorthandFirst": true,
        "ignoreCase": true,
        "reservedFirst": true,
      }],
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
];