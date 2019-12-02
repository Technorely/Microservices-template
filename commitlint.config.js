module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-eslint",
  rules: {
    "type-enum": [
      2,
      "always",
      ["Fix", "Update", "Breaking", "Docs", "Build", "New", "Upgrade"]
    ],
    "type-case": [2, "always", "pascal-case"],
    "subject-case": [2, "always", "sentence-case"]
  }
};
