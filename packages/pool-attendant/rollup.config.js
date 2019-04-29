import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "./lib/index.tsx",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      name: "poolAttendant",
      globals: { react: "React" }
    },
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  external: ["react"],
  plugins: [typescript()]
};
