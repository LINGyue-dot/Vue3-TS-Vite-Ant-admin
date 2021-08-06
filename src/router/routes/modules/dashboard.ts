import { LAYOUT } from '../../constant';
import { AppRouterRecordRaw } from '../../types';

const dashboard: AppRouterRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  meta: {
    title: 'DashBoard',
  },
  redirect: '/dashboard/analysis',
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('views/dashboard/analysis/index.vue'),
      meta: {
        title: '分析台',
        icon: 'sad',
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('views/dashboard/workbench/index.vue'),
      meta: {
        title: '工作台',
        icon: 'sad'
      }
    }
  ],
};



export default dashboard;
