import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import parserTypescript from "@typescript-eslint/parser";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    languageOptions: {
      parser: parserTypescript,
      globals: {
        browser: true,
        jest: true,
      },
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "error",
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^\\u0000"],
            ["^"],
            ["^react", "^@?\\w"],
            ["^\\."],
            ["^node:"],
          ],
        },
      ],
    },
    settings: {
      react: {
        pragma: "React",
      },
    },
  },
];
