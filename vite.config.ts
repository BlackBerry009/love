import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'  // 添加这一行-----

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
