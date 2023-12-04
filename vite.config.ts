import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@comp": path.resolve(__dirname, "./src/components/"),
      "@reducer": path.resolve(__dirname, "./src/reducers/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@services": path.resolve(__dirname, "./src/services/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@config": path.resolve(__dirname, "./src/config/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@routes": path.resolve(__dirname, "./src/routes/"),
    },
  },
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5173
  }
})
