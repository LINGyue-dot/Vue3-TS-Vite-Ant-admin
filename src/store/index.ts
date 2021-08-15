/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-06 21:30:04
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-08-15 20:20:15
 * @Description: 
 */
import { App } from "vue";
import { createStore } from "vuex";
import { importAllStore } from "../utils/store";


export const store = createStore({
  modules: importAllStore()
})


export const setupStore = (app: App<Element>) => {
  app.use(store)
}


