import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/proposal-schedule-in-kosen/",
  plugins: [preact()],
});
