import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

import vueJsx from '@vitejs/plugin-vue-jsx';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), WindiCSS()],
  // 配置别名改变了
  resolve: {
    alias: {
      views: resolve(__dirname, 'src/views'),
      layouts: resolve(__dirname, 'src/layouts'),
      router: resolve(__dirname, 'src/router'),
      utils:resolve(__dirname,'src/utils')
    },
  },
});
