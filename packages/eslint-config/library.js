const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
  plugins: ["only-warn", "import", "unused-imports"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports-ts": "error",
    "max-depth": "error",
    eqeqeq: "error",
    complexity: "error",
    "import/order": [
      error,
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        alphabetize: { "order": "asc", "caseInsensitive": true },
        pathGroups: [
          {
            pattern: "react**",
            group: "external",
            position: "before"
          }
        ],
        pathGroupsExcludedImportTypes: ["builtin"]
      }
    ]
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
    },
  ],
};
