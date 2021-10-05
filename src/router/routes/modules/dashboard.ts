/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-05 02:48:46
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-05 10:49:22
 * @Description: 
 */
import { Role } from '../../../store/modules/user';
import { LAYOUT } from '../../constant';
import { AppRouterRecordRaw } from '../../types';

const dashboard: AppRouterRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  meta: {
    title: 'DashBoard',
    roles: [Role.Tourist, Role.Gadmin, Role.Sadmin]
  },
  redirect: '/dashboard/analysis',
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('../../../views/dashboard/analysis/index.vue'),
      meta: {
        title: '分析台',
        icon: 'sad',
        roles: [Role.Tourist, Role.Gadmin, Role.Sadmin]
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('../../../views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
        icon: 'sad',
        roles: [Role.Tourist, Role.Gadmin, Role.Sadmin]
      }
    }
  ],
};



export default dashboard;
