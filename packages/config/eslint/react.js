const { rules } = require("eslint-config-prettier");

module.exports = {
  extends: [
    "./index.js",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
  ],
  plugins: ["react-refresh"],
  root: true,
  env: {
    browser: true,
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};
