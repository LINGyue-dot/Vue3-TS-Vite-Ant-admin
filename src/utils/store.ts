import { ModuleTree } from "vuex";


/**
 * 引入所有的 store 模块
 */
export function importAllStore<S>(): ModuleTree<S> {
  const modules: ModuleTree<S> = {}

  // 导入 /store/modules/*.ts 下的全部 store
  const outModules = import.meta.globEager('../store/modules/*.ts')

  Object.keys(outModules).forEach(key => {
    try {
      const { name, ...module } = outModules[key].default
      modules[name] = { ...module }
    } catch (e) {
      throw new Error('check store module import ')
    }
  })

  // 导入 /views 下的所有 store.ts 文件

  const innerModules = import.meta.globEager('../views/**/store.ts')
  Object.keys(innerModules).forEach(key => {
    try {
      const { name, ...module } = innerModules[key].default
      modules[name] = { ...module }
    } catch (e) {
      throw new Error('check store module import ')
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


