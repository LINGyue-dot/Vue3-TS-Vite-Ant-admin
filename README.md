# Vue 3 + Typescript + Vite









## 配置



### 依赖

* 打包工具：Vite
* Mock : [yapi](https://github.com/YMFE/yapi)
* CSS : [Windi CSS](https://windicss.org/)
* router : vue-router
* 数据状态管理 : vuex + provider/inject
* UI 组件库 :  [ant-design-vue](https://2x.antdv.com/docs/vue/getting-started-cn)



* qs









### Mock 数据

主要是说明 yapi 的操作



* 自动化测试对接接口
* 



#### 前置
* 自己创建一个仓库在 http://yapi.smart-xwork.cn
* 安装 cross-request 参考 https://juejin.cn/post/6844904057711099912

#### 如何 mock 数据

参考官网文档，大致效果如下说明成功

![image-20210803191550956](http://120.27.242.14:9900/uploads/upload_79c25ee78678858ab8db1eeef22f495a.png)



## 需求



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



### 面包屑



### 多 tab 



### Icon 图标使用





### 路由重定向作用







### 类型系统







### Loading 状态



## temp



* createRoute option 中的 strict
* scrollbar 组件

