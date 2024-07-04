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
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },
];