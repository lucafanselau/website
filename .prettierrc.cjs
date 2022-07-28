// prettier.config.js or .prettierrc.js
module.exports = {
  arrowParens: "avoid",
  useTabs: false,
  printWidth: 140,
  tabWidth: 4,
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
