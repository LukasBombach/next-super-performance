const path = require("path");

module.exports = (nextConfig = {}) => {
  const webpack = webpackConfig => modifyWebpackConfig(webpackConfig);
  return Object.assign({}, nextConfig, { webpack });
};

function modifyWebpackConfig(webpackConfig) {
  if (webpackConfig.name === "client") {
    webpackConfig.entry = webpackConfig.entry().then(e => replaceMainJs(e));
    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};
    webpackConfig.resolve.alias["react"] = "preact/compat";
    webpackConfig.resolve.alias["react-dom"] = "preact/compat";
  }
  return webpackConfig;
}

function replaceMainJs(entry) {
  entry["static/runtime/main.js"] = path.resolve(__dirname, "client.js");
  return entry;
}
