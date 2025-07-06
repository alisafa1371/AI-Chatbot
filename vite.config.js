import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    env: {
      VITE_OPENROUTER_KEY: "$VITE_OPENROUTER_KEY",
    },
  },
});
