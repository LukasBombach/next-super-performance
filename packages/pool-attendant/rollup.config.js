import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "./lib/index.tsx",
  output: "./dist/index.js",
  output: [
    { file: pkg.browser, format: "umd", name: "poolAttendant" },
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  plugins: [typescript()]
};
