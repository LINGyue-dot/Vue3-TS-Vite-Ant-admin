/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-06 10:16:45
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-16 15:23:20
 * @Description: 
 */
import { Role } from "../../../store/modules/user";
import { LAYOUT } from "../../constant";
import { AppRouterRecordRaw } from "../../types";


const party: AppRouterRecordRaw = {
  path: '/party',
  name: 'Party',
  component: LAYOUT,
  meta: {
    title: '派对',
    icon: 'sad',
    roles: [Role.Tourist, Role.Gadmin, Role.Sadmin]
  },
  redirect: '/party/index',
  children: [
    {
      path: 'index',
      name: 'PartyPage',
      component: () => import('views/party/index.vue'),
      meta: {
        title: '派对',
        roles: [Role.Tourist, Role.Gadmin, Role.Sadmin]
      },
    }
  ],
}

export default party