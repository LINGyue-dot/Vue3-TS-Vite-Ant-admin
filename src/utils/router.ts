import { asyncRoutes } from "../router/routes"
import { AppRouterRecordRaw } from "../router/types"


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