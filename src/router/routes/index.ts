/**
 * @auth: qianlong
 * @github: LINGyue-dot
 * @e-mail: qianlonwork@outlook.com
 * @description: 路由整合封装
 */
import { AppRouterRecordRaw } from '../types';

// 引入 modules 下的全部路由文件
const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: AppRouterRecordRaw[] = [];

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

// 动态路由表
export const asyncRoutes = [...routeModuleList];

export const RootRoute: AppRouterRecordRaw = {
  path: '/',
  name: 'Root',
  meta: {
    title: '根',
  },
  redirect: '/dashboard/analysis',
};

export const LoginRoute: AppRouterRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('views/login/index.vue'),
  meta: {
    title: '登入',
  },
};

export const basicRoutes = [LoginRoute, RootRoute, ...asyncRoutes];
