import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/models": {
        target: "https://raw.githubusercontent.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/models/, ""),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  optimizeDeps: {
    include: ["@react-three/drei", "three"],
  },
});
