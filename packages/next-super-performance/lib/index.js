// prettier-ignore
const { HydrationData, withHydration, hydrate } = require("pool-attendant-preact");
const plugin = require("./plugin");

module.exports = plugin;

module.exports.HydrationData = HydrationData;
module.exports.withHydration = withHydration;
module.exports.hydrate = hydrate;
