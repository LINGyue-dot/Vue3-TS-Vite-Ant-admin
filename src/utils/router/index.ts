/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-06 09:57:48
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-11 11:16:34
 * @Description: 
 */
import { RouteRecordRaw } from "vue-router"
import { router } from "../../router"
import { asyncRoutes } from "../../router/routes"
import { AppRouterRecordRaw } from "../../router/types"
import { store } from "../../store"
import { Role } from "../../store/modules/user"
import { cloneDeep } from 'lodash'
import { hasPermission } from "../auth"
import { deepCopy } from "../js"

/**
 * 获取用户的权限路由
 * 此刻暂时处理
 */
export const getPermissionRoutes = () => {
  return asyncRoutes
}

/**
 * warnning ！！！
 * 此函数使用存在前置条件: item.children 存在时候
 * 用于判断是否是菜单单界面即 /party/index 在菜单左侧直接渲染 ，而非再嵌套一层
 * @param item 
 * @returns 
 */
export const isSingleMenuItem = (item: AppRouterRecordRaw) => {
  try {
    // @ts-ignore
    if (item.children.length === 1 && item.children[0].path === 'index')
      return true
    else
      return false
  } catch (e) {
    throw new Error('isSingleMenuItem 函数必须在 item.children 存在时候才可使用')
  }

}

/**
 * 是否渲染成 a-sub-menu 模式
 * @param item 
 * @returns 
 */
export const renderChildren = (item: AppRouterRecordRaw) => {
  if (!item.children)
    return false
  if (isSingleMenuItem(item))
    return false
  return true
}


export const addAsyncRoutes = async () => {
  const { role = Role.Gadmin } = await store.dispatch('user/fetchCurrent')
  const permissionRoutes = await store.dispatch('permission/generateRoutes', role)
  permissionRoutes.forEach(item => {
    router.addRoute(item as unknown as RouteRecordRaw)
  })
}

/**
 * 通过 role 过滤出现在的满足条件的异步路由
 * @param role 
 * @param routes 
 */
export function filterAsyncRoutes(role: Role, routes: AppRouterRecordRaw[]): AppRouterRecordRaw[] {
  const res: AppRouterRecordRaw[] = []
  routes.forEach(route => {
    console.log(route, deepCopy(route))
    // !!!! 
    const temp = cloneDeep(route)
    store.commit('permission/addDynamicRoute', temp)
    if (hasPermission(role, temp)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(role, temp.children)
      }
    }
    //
    res.push(temp)
  })
  return res
}