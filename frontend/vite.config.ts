import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let BACKEND_URL = "";
  const env = loadEnv(mode, process.cwd(), "");

  if (env.MODE == "development") {
    BACKEND_URL = "localhost:8000";
  } else {
    BACKEND_URL = env.BASE_URL;
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": BACKEND_URL,
      },
      port: 8000,
      cors: {
        origin: BACKEND_URL,
      },
      origin: BACKEND_URL,
    },
  };
});
