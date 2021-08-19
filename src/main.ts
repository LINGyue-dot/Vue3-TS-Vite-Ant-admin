/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-03 07:18:55
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-17 18:12:52
 * @Description: 
 */
import { createApp } from 'vue';
import App from './App.vue';

import Antd from 'ant-design-vue';

import 'virtual:windi.css';
import 'ant-design-vue/dist/antd.css';
import { router, setupRouter } from './router';
import { setupStore } from './store';
import { setupRouterGuard } from './router/guard';

async function boostrap() {
  const app = createApp(App);
  app.use(Antd);

  await setupStore(app)

  setupRouter(app);

  // setupRouterGuard(router)

  await router.isReady();

  app.mount('#app', true);
}

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void
void boostrap();
