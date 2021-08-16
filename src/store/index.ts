/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-06 21:30:04
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-16 17:27:10
 * @Description: 
 */
import { App } from "vue";
import { createStore, Module } from "vuex";
import { importAllStore } from "../utils/store";
import { PermissionStateType } from "./modules/permission";
import { StateType } from "./modules/user";

// 仅仅是为了权限管理中使用 user.ts 与 permission.ts 所以才添加的部分类型
// 见 /src/router/guard/permissionGuard.ts
export interface SomeStoreType {
  user:StateType;
  permission:PermissionStateType,
}

export const store = createStore<SomeStoreType>({
  modules: importAllStore()
})

export const setupStore = (app: App<Element>) => {
  app.use(store)
}


