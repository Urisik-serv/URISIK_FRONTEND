import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // '/api'로 시작하는 모든 요청을 프록시가 가로챔
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
