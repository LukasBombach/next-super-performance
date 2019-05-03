const path = require("path");

const performance = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.isServer) replaceMainJs(config, "react");
      return typeof nextConfig.webpack === "function"
        ? nextConfig.webpack(config, options)
        : config;
    }
  });
};

const performanceWithNext = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.isServer) {
        replaceMainJs(config, "preact");
        usePreactCompat(config);
      }
      return typeof nextConfig.webpack === "function"
        ? nextConfig.webpack(config, options)
        : config;
    }
  });
};

const performanceWithNextOnServer = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) throwVersionError();
      if (options.isServer) useReactAsExternals(config);
      if (!options.isServer) replaceMainJs(config, "preact");
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

function replaceMainJs(config, framework) {
  config.entry = config.entry().then(entry => {
    entry["static/runtime/main.js"] = path.resolve(
      __dirname,
      `client.${framework}.js`
    );
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

module.exports = performance;
