# Vue 3 + Typescript + Vite

项目仍在开发中，业务模块还未嵌入
功能目前已完成
* vuex 二次封装
* vue-router 二次封装
* axios 二次封装
* 权限管理
* URL 状态管理


## 配置


### 依赖

* 打包工具：Vite
* Mock : [yapi](https://github.com/YMFE/yapi)
* CSS : [Windi CSS](https://windicss.org/)
* router : vue-router
* 数据状态管理 : vuex
* UI 组件库 :  [ant-design-vue](https://2x.antdv.com/docs/vue/getting-started-cn)



* qs



## 待总需求



简单 table 展示支持增删改查

* 用户列表
* 文章列表（具有分类的 tag ）
* 动态列表（具有热点的 tag ）

其余需求

* 非对称加密
* url 状态管理 即登录后跳转
* 动态路由
* 异常监控图表
* 评论文章/动态
* 用户分布地（ ip 获取）
* 访问量图表（ echart dthree ）
* 后台即时渲染文章 md 格式 手机端 / pc
* 发布文章选择官方作者
* 发布动态选择官方作者
* 游客无权限预览，再具体细分权限管理
* 回收站功能
* 分配用户
* 终极管理员自定义创建
* 评论/审核功能
* ci cd 负载均衡
* 测试
* 认证渠道（认证学者或者专家）
* 消息推送即最新动态

### 几个用户

* tourist 游客
* gadmin 普通管理员（不可修改其他用户信息）
* sadmin 超级管理员（可修改其他用户信息）

## 开发


### 路由界面

* dashboard
  * analysis
  * workbench
* user
  * list
  * authentication
* passage
  * list
  * publish
  * detail
* note
  * list
  * publish
  * detail
* video
  * list
  * upload
  * detail
* comment
  * passage
  * note
  * video
* party
  * list



### api

后端返回的 api 统一返回为该结构

```json
{
	"code":200, // 成功 200 其余失败
	"message":"", 
	"result":{
		// ...
	}
}
```
## 功能

### 路由生成侧边栏

整体思路即为：将经过权限过滤的路由表传入 `ant-desgin-vue` 中的 `a-menu`  由 children 来进行不同的渲染即 `a-sub-menu` 再递归或者 `a-menu-item`  直接渲染。

所携带参数配置项目中如下

```ts
// 路由设置
// 展开式需要渲染成 a-sub-menu 
// meta 携带数据
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

// 无需展开单 即原本不存在 children 但是为了布局应用所以使得只存在一个 children 
// 直接使用 a-menu-item 的如下
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

```









### 动态路由

https://github.com/vuejs/vue-router-next/issues/471

http://cxyzjd.com/article/weixin_43835425/116708448







### ts 封装 store

稍微大型的项目中，全局状态管理无疑显得非常重要，本项目中使用 vuex 来实现全局状态管理

由于多个模块需要所以使用多 modules

目录结构如下，同样在每个 views 也可能需要耦合型的 store

```
- store
	- modules // 每个独立出来的 store 模块
	- index.ts // vuex 插件使用挂载入口
	- types.ts // ts 通用 stroe 的类型定义
- views
	- ***
		- store.ts // 不同 views 也可能存在和业务相关较强的 store
```



#### 引入注册

自动化引入所有的 module 并且自动注册挂载（注意：此时的每个 module store 文件都需要有通用的 ts 类型约束主要是为了解决命名问题）



```ts
// 所有的 module store 都需要继承此接口，约束 name 以便注册
export interface StoreModuleType<S> extends Module<S, S> {
  namespaced: boolean;
  name: string;
}
```



```ts
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
```





#### module store ts 约束

以下为 module store 文件实例

```ts
import { Mutation } from "vuex";
import { StoreModuleType } from "../types";

export interface GlobalStateType {
  collapsed: boolean; // 左侧是否折叠
}

export interface GlobalStoreType extends StoreModuleType<GlobalStateType> {
  state: GlobalStateType,
  mutations: {
    changeMenuCollapse: Mutation<GlobalStateType>;
  },
  // actions getters ...
}

const StoreModel: GlobalStoreType = {
  namespaced: true,
  name: 'global',
  state: {
    collapsed: false
  },
  mutations: {
    changeMenuCollapse(state) {
      state.collapsed = !state.collapsed
    }
  }
}

export default StoreModel
```



#### 使用






### ts 封装 axios



#### 响应请求处理以及封装

本项目中主要有五个函数


![image-20210815165639283](http://120.27.242.14:9900/uploads/upload_757313415728a1844f3b750a364193a0.png)






* createRoute option 中的 strict
* scrollbar 组件









## 期间所遇的 bug



### addRoute

#### 问题

addRoute 之后的 `router.getRoutes()` 得到的 components 为 `undefined`

![image-20211005105734379](http://120.27.242.14:9900/uploads/upload_9250b076afcda1111e3fb76093f6ece3.png)

#### 解决过程

原先先将问题定位到 `vue-router-next` 中，所以将 `vue-router-next` 源码结合博客基本看完，在看后发现 `addRoute` 并不会去对 `default`  的 `component` 做操作，就将问题再定位到自己的逻辑中

#### 解决

由于在过滤权限路由时候需要深拷贝再进行递归子组件生成权限路由，在深拷贝时候天真的使用了如下 es6 的拷贝，但该拷贝方案无法拷贝函数，而组件引入方式都是以懒加载函数导入，所以导致所有权限路由的组件都是 `undefined`

```ts
export function deepCopy<T = any>(target: T): T {
  return JSON.parse(JSON.stringify(target));
}
```







# Ref



本项目部分参考

* https://github.com/lqsong/admin-antd-vue
* https://github.com/anncwb/vue-vben-admin