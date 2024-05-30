import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local",
    },
  },
  server: {
    port: 4000,
  },
  preview: {
    port: 4000,
  },
});
