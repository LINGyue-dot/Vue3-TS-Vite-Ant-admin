/*
 * @Author: qianlong github:https://github.com/LINGyue-dot
 * @Date: 2021-08-07 12:22:41
 * @LastEditors: qianlong github:https://github.com/LINGyue-dot
 * @LastEditTime: 2021-10-11 10:43:38
 * @Description: 
 */
import { ModuleTree } from "vuex";


/**
 * 引入所有的 store 模块
 */
export function importAllStore<S>(): ModuleTree<S> {
  const modules: ModuleTree<S> = {}

  // 导入 /store/modules/*.ts 下的全部 store
  const outModules = import.meta.globEager('../../store/modules/*.ts')

  Object.keys(outModules).forEach(key => {
    if (key === '../../store/modules/user.ts') return
    try {
      const { name, ...module } = outModules[key].default
      modules[name] = { ...module }
    } catch (e) {
      throw new Error('/src/utils/store auto import store module error ')
    }
  })

  // 导入 /views 下的所有 store.ts 文件
  const innerModules = import.meta.globEager('../../views/**/store.ts')
  Object.keys(innerModules).forEach(key => {
    try {
      const { name, ...module } = innerModules[key].default
      modules[name] = { ...module }
    } catch (e) {
      throw new Error('/src/utils/store auto import store module error ')
    }
  })

  return modules
}





  // outModules:
  // {
  //   "../store/modules/global.ts": {
  //     "default": {
  //         "namespaced": true,
  //         "name": "global",
  //         "state": {
  //             "collapsed": false
  //         },
  //         "mutations": {}
  //     }
  // },
  // "../store/modules/user.ts": {}
  // }


