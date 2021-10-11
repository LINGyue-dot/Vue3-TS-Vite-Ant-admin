/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-15 15:53:42
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-11 11:10:13
 * @Description: 权限认证工具函数
 */

import { AppRouterRecordRaw } from "../../router/types"
import { Role } from "../../store/modules/user"


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




