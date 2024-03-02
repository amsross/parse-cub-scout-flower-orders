module.exports = {
  extends: [ "plugin:@typescript-eslint/recommended", ],
  plugins: ["eslint-plugin-import"],
  parser: "@typescript-eslint/parser",
  settings: {
    "import/extensions": [".js", ".mjs", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      node: {
        extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    quotes: ["error", "double", { avoidEscape: true }],
    "import/prefer-default-export": "off",
    "import/order": [
      2,
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  }
};
