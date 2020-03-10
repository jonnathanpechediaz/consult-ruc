module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "no-console": 0,
    "vue/no-v-html":0,
    "vue/no-use-v-if-with-v-for": "off",
    'nuxt/no-cjs-in-config': 'off',
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "always"],
  }
}
