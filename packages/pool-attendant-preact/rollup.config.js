import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "./lib/index.ts",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      name: "poolAttendant",
      globals: { preact: "Preact" }
    },
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  external: ["preact"],
  plugins: [typescript()]
};
