module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "react-hooks/exhaustive-deps": "off",
    "no-duplicate-imports": "error",
    "sort-imports": [
      "error",
      { ignoreCase: true, ignoreDeclarationSort: true }
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        alphabetize: { order: "asc" },
        "newlines-between": "always-and-inside-groups"
      }
    ]
  },
  settings: {
    "import/resolver": {
      typescript: {}
    }
  }
};
