/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 15:53:42
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-16 17:58:59
 * @Description: 权限认证工具函数
 */

import { AppRouterRecordRaw } from "../../router/types"
import { Role } from "../../store/modules/user"
import { deepCopy } from "../js"

export const TOKEN_NAME = 'X-Token'


export function getToken() {
  return localStorage.getItem(TOKEN_NAME)
}

export function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_NAME, token)
  } catch (e) {
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_NAME)
  } catch (e) {

  }
}

/**
 * 判断该路由是否有权限
 * @param roles 
 * @param route 
 */
export function hasPermission(role: Role, route: AppRouterRecordRaw) {

  if (route.meta?.roles) {
    return route.meta.roles.includes(role)
  } else { // 如果不存在 role meta 那么就是无权限限制路由
    return true
  }

}

/**
 * 通过 role 过滤出现在的满足条件的异步路由
 * @param role 
 * @param routes 
 */
export function filterAsyncRoutes(role: Role, routes: AppRouterRecordRaw[]): AppRouterRecordRaw[] {

  const res: AppRouterRecordRaw[] = []
  routes.forEach(route => {
    const temp = deepCopy(route)

    if (hasPermission(role, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(role, temp.children)
      }
    }
    res.push(temp)
  })
  return res
}


