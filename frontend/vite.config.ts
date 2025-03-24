import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(() => {
  let baseURL = "";

  if (process.env.MODE != "production") {
    baseURL = "localhost:8000";
  } else {
    baseURL = process.env.BASE_URL || "";
  }

  return {
    plugins: [react()],
    preview: {
      cors: {
        origin: [baseURL],
      },
      origin: baseURL,
    },
    server: {
      origin: baseURL,
    },
    define: {
      __BASE_URL__: JSON.stringify(baseURL),
      __APP_ENV__: JSON.stringify(process.env.MODE || ""),
    },
  };
});
