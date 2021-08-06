import { LAYOUT } from "../../constant";
import { AppRouterRecordRaw } from "../../types";


const party: AppRouterRecordRaw = {
  path: '/party',
  name: 'Party',
  component: LAYOUT,
  meta: {
    title: '派对',
    icon: 'sad',
  },
  redirect: '/party/index',
  children: [
    {
      path: 'index',
      name: 'PartyPage',
      component: () => import('views/party/index.vue'),
      meta: {
        title: '派对',
      },
    }
  ],
}

export default party