import { defineConfig } from "vite";
import { resolve } from "path";

// Multi-page build: each HTML file is an entry point so Vite
// emits a complete, deployable dist/ with all pages bundled.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        details: resolve(__dirname, "event-details.html"),
        register: resolve(__dirname, "register.html")
      }
    }
  }
});
