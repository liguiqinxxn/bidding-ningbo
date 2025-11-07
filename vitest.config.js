import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
    include: ["tests/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: [
      "**/*.cjs",
      "**/.history/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/config.js",
      "**/*.config.js",
      "**/e2e/**",
    ],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "src/main.ts",
        "src/shims-vue.d.ts",
        "**/*.d.ts",
        "**/*.cjs",
        "**/.history/**",
        "**/config.js",
        "**/*.config.js",
        "**/e2e/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
