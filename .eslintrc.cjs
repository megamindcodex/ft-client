/* eslint-env node */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential', // Essential rules for Vue 3
    'eslint:recommended', // Recommended rules from ESLint
    '@vue/eslint-config-prettier/skip-formatting', // Skip formatting rules if you're using prettier
    'plugin:prettier/recommended' // Use prettier for formatting
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: 'babel-eslint', // Optional: if you're using Babel
    sourceType: 'module'
  },
  rules: {
    // Add custom rules here
  },
  settings: {
    'vue/typescript/recommended': true // Optional: if you're using TypeScript
  }
}
