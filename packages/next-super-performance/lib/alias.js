const path = require("path");
const moduleAlias = require("module-alias");

module.exports = () => {
  // moduleAlias.addAlias("react", "preact/compat");
  moduleAlias.addAlias("react", path.resolve(__dirname, "preactCompat.js"));
  moduleAlias.addAlias("react-dom", "preact/compat");
  moduleAlias.addAlias("react-ssr-prepass", path.resolve(__dirname, "noop.js"));
};
