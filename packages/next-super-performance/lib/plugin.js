const path = require("path");

const plugin = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) throwVersionError();
      if (!options.isServer) replaceMainJs(config);
      if (options.isServer) useReactAsExternals(config);
      usePreactCompat(config);
      return typeof nextConfig.webpack === "function"
        ? nextConfig.webpack(config, options)
        : config;
    }
  });
};

function throwVersionError() {
  throw new Error(
    "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
  );
}

function useReactAsExternals(config) {
  config.externals = ["react", "react-dom", ...config.externals];
}

function replaceMainJs(config) {
  config.entry = config.entry().then(entry => {
    entry["static/runtime/main.js"] = getPathToClientJs();
    return entry;
  });
}

function usePreactCompat(config) {
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    react: "preact/compat",
    react$: "preact/compat",
    "react-dom": "preact/compat",
    "react-dom$": "preact/compat"
  });
}

function getPathToClientJs(filename = "client.js") {
  // TODO it seems we cannot access fs const fs = require("fs");
  // const userClientJsPath = path.resolve(process.cwd(), filename);
  // const defaultClientJsPath = path.resolve(__dirname, filename);
  // const userClientJsExists = fs.existsSync(userClientJsPath);
  // return userClientJsExists ? userClientJsPath : defaultClientJsPath;
  return path.resolve(process.cwd(), filename);
}

module.exports = plugin;
