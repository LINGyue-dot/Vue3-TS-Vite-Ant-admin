import { RouteMeta, RouteRecordRaw } from 'vue-router';

export interface AppRouterMeta {
  // 菜单中是否隐藏
  hidden?: boolean;
  // 图标名称
  icon?: string;
  // 权限控制
  roles?: string[];
  // 标题在 sider 中显示
  title: string;
}

export interface AppRouterRecordRaw
  extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta: AppRouterMeta;
  children?: AppRouterRecordRaw[];
}
