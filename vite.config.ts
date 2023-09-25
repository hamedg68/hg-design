import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import * as path from "path";
import typescript2 from "rollup-plugin-typescript2";
import dts from "vite-plugin-dts";

export default defineConfig({
  optimizeDeps: {
    exclude: ["vue3-persian-datetime-picker"],
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/components/main.ts",
      name: "HGDesign",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `hg-design.${format}.js`,
      // fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      // make sure to externalize deps that should not be bundled
      // into your library
      input: {
        main: path.resolve("src/components/main.ts"),
      },
      external: ["vue", "vue3-persian-datetime-picker"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "main.css") return "hg-design.css";
          return assetInfo.name;
        },
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve("src"),
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    //for vue3-persian-datetime-picker
    // mainFields: [
    //   'browser',
    //   'module',
    //   'main',
    //   'jsnext:main',
    //   'jsnext'
    // ]
  },
});
