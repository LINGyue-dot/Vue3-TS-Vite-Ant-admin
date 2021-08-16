/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-16 10:59:51
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-16 17:22:16
 * @Description: 路由权限拦截器
 */

import { message } from "ant-design-vue";
import type { Router, RouteRecordRaw } from "vue-router";
import { store } from "../../store";


const whiteList = ['/login']



export function createPermissionGuard(router: Router) {


  router.beforeEach(async (to, from, next) => {

    // 如果已验证或者是白名单路由表
    // !!! todo 此处应该对路由的 meta 添加是否验证更合理
    // 注意此处的 store 是需要 createStore 时候定义类型
    if (store.state.user.verificated || whiteList.includes(to.path)) {
      next()
      return
    }

    // 如果存在 token 则动态添加路由表
    if (store.state.user.token) {
      try {
        // 动态添加路由表

        const { role } = await store.dispatch('/user/fetchCurrent')

        const permissionRoutes = await store.dispatch('/permission/generateRoutes', role)

        permissionRoutes.forEach(item => {
          router.addRoute(item as unknown as RouteRecordRaw)
        })

        // 最后添加 404 界面

        // https://next.router.vuejs.org/guide/advanced/dynamic-routing.html#adding-routes-inside-navigation-guards
        // 添加动态路由后应该重定向
        next({ path: to.fullPath, replace: true, query: to.query });
        return
      } catch (e) {
        /**
         * 权限路由过滤函数
         * 动态添加路由
         */

        // !!! todo 此处应该还需要一次携带 query 的重定向，避免丢失数据
        next('/login')
        message.warning('登入状态消失，请重新登入')
        return
      }
    } else {
      next('/login')
      message.warning('请登入')
    }

  })


}
