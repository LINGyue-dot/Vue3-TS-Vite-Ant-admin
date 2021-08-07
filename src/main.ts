import { createApp } from 'vue';
import App from './App.vue';

import Antd from 'ant-design-vue';

import 'virtual:windi.css';
import 'ant-design-vue/dist/antd.css';
import { router, setupRouter } from './router';
import { setupStore } from './store';

async function boostrap() {
  const app = createApp(App);
  app.use(Antd);

  setupRouter(app);

  setupStore(app)

  await router.isReady();

  app.mount('#app', true);
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void
void boostrap();
