// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Top‐level document must send both
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
      // And your worker/WASM script may need this too:
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
  },
});
