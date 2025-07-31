import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
const resolve = (p: string) => path.resolve(__dirname, p)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components":resolve('src/components'),
      "@utils":resolve('src/utils'),
      "@store":resolve('src/store'),
      "@views":resolve('src/views'),
      "@router":resolve('src/router'),
      "@assets":resolve('src/assets'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],

  }
})
