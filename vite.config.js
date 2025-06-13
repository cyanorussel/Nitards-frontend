import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    define: {
        'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    },
});

// Use this in your API calls
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Example fetch
fetch(`${API_BASE_URL}/api/your-endpoint`)
  .then(res => res.json())
  .then(data => console.log(data));
