/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-04 23:41:45
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-16 15:17:39
 * @Description: 
 */
import { RouteMeta, RouteRecordRaw } from 'vue-router';
import { Role } from '../store/modules/user';

export interface AppRouterMeta {
  // 菜单中是否隐藏
  hidden?: boolean;
  // 图标名称
  icon?: string;
  // 权限控制
  roles?: Role[];
  // 标题在 sider 中显示
  title: string;
}

export interface AppRouterRecordRaw
  extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta: AppRouterMeta;
  children?: AppRouterRecordRaw[];
}
