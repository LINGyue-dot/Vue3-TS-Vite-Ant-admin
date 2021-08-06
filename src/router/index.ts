/**
 * @auth: qianlong
 * @github: LINGyue-dot
 * @e-mail: qianlonwork@outlook.com
 * @description: 所有路由文件定义入口
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { basicRoutes, asyncRoutes } from "./routes";
import type { App } from "vue";

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: (basicRoutes as unknown) as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function addAsyncRouter() {
  asyncRoutes.forEach(route => {
    router.addRoute(route as unknown as RouteRecordRaw);
  });
}

// 当重新刷新权限或者失去权限时候调将所有路由卸载
export function resetRouter() {

}


export function setupRouter(app: App<Element>) {
  app.use(router);
}
