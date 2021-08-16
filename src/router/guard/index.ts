/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-05 00:38:56
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-16 16:59:15
 * @Description: 路由守卫文件 包括路由跳转以及过渡动画
 */

import { Router } from "vue-router";
import { createPermissionGuard } from "./permissionGuard";


export function setupRouterGuard(router:Router){
  createPermissionGuard(router)
}