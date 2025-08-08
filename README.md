https://github.com/dohomi/react-hook-form-mui


npm install vite-plugin-mock -D



遇到的坑
- 导入时，@types别名下的类型飘红
> 解决：更换别名，例如使用@ctypes
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
const resolve = (p: string) => path.resolve(__dirname, p)
export default defineConfig({
  plugins: [
      react(),
    viteMockServe({
    mockPath: 'mock', enable: true
  })],
  resolve: {
    // alias: [{find:'@',replacement:path.resolve(__dirname,'src')}],

    alias: {
      "@components":resolve('src/components'),
      "@utils":resolve('src/utils'),
      "@store":resolve('src/store'),
      "@views":resolve('src/views'),
      "@router":resolve('src/router'),
      "@assets":resolve('src/assets'),
      "@commons":resolve('src/commons'),
      "@services":resolve('src/services'),
      "@mock":resolve('src/mock'),
      "@ctypes":resolve('./src/types'), //ctypes
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js'],

  }
})

```


