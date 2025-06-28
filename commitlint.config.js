module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["build", "ci", "docs", "feat", "fix", "perf", "refactor", "test"],
    ],
    "header-max-length": [2, "always", 200],
    "scope-empty": [2, "never"],
  },
};
  