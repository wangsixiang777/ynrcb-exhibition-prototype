import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 相对路径，便于 GitHub Pages / 任意子目录部署
export default defineConfig({
  plugins: [react()],
  base: './',
})
