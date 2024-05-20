const path = require("path");

module.exports = {
  default: `--format-options '{"snippetInterface": "synchronous"}'`,
  paths: [path.resolve(__dirname, "../__tests__/bdd/features")],
};
