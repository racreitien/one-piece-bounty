import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let BACKEND_URL = "";
  const env = loadEnv(mode, process.cwd(), "");

  if (env.MODE != "production") {
    BACKEND_URL = "localhost:8000";
  } else {
    BACKEND_URL = env.BASE_URL;
  }

  return {
    plugins: [react()],
    preview: {
      cors: {
        origin: [BACKEND_URL],
      },
      origin: BACKEND_URL,
    },
    server: {
      origin: BACKEND_URL,
    },
  };
});
