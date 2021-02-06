import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout'

Vue.use(Router)

export const routers = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: { title: '系统登录' },
    component: () => import('@/pages/Auth/login')
  },
  {
    path: '/register',
    name: 'register',
    hidden: true,
    meta: { title: '系统注册' },
    component: () => import('@/pages/Auth/register')
  },
  {
    path: '/test',
    name: 'test',
    hidden: true,
    meta: { title: 'test' },
    component: () =>
      import('@/pages/test')
  },
  {
    path: "/",
    name: 'Layout',
    component: Layout,
    hidden: false,
    children: [{
      path: '/',
      name: 'home',
      meta: { title: '首页', icon: 'iconfont icon-home' },
      component: () =>
        import('@/pages/Home')
    }]
  },
  {
    path: '/productManage',
    name: 'productManage',
    hidden: false,
    meta: { title: '商品管理', icon: 'iconfont icon-shangpinguanli' },
    component: Layout,
    children: [
      {
        path: '/productManage',
        name: 'productManage',
        hidden: false,
        meta: { title: '商品列表' },
        component: () =>
          import('@/pages/Product'),
      },
      {
        path: '/addProduct',
        name: 'addProduct',
        hidden: true,
        meta: { title: '添加商品' },
        component: () =>
          import('@/pages/Product/add/addProduct.vue'),
      },
      {
        path: '/editProduct',
        name: 'editProduct',
        hidden: true,
        meta: { title: '编辑商品' },
        component: () =>
          import('@/pages/Product/editProduct.vue'),
      },
      {
        path: '/categoryManage',
        name: 'categoryManage',
        hidden: false,
        meta: { title: '分类列表' },
        component: () =>
          import('@/pages/Category')
      },
      {
        path: '/specsManage',
        name: 'specsManage',
        hidden: false,
        meta: { title: '规格列表' },
        component: () =>
          import('@/pages/Product/specs')
      }
    ]
  },
  {
    path: '/orderManage',
    name: 'orderManage',
    hidden: false,
    component: Layout,
    children: [{
      path: '/orderManage',
      name: 'orderManage',
      meta: { title: '订单管理', icon: 'iconfont icon-order' },
      component: () =>
        import('@/pages/Order')
    }]
  },
  {
    path: '/payManage',
    name: 'payManage',
    hidden: false,
    component: Layout,
    children: [{
      path: '/payManage',
      name: 'payManage',
      meta: { title: '支付管理', icon: 'iconfont icon-pay' },
      component: () =>
        import('@/pages/Pay')
    }]
  },
  {
    path: '/commentManage',
    name: 'commentManage',
    hidden: false,
    component: Layout,
    children: [{
      path: '/commentManage',
      name: 'commentManage',
      hidden: false,
      meta: { title: '评论管理', icon: 'iconfont icon-guanggao' },
      component: () => import('@/pages/Comment')
    }]
  },
  {
    path: '/contentManage',
    name: 'contentManage',
    hidden: false,
    component: Layout,
    meta: { title: '内容管理', icon: 'iconfont icon-neirongguanli' },
    children: [
      {
        path: '/bannerManage',
        name: 'bannerManage',
        meta: { title: '首页轮播图管理' },
        component: () => import('@/pages/Content/banner')
      },
      {
        path: '/advertManage',
        name: 'advertManage',
        meta: { title: '首页广告管理' },
        component: () => import('@/pages/Content/advert')
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    hidden: false,
    component: Layout,
    children: [{
      path: '/userManage',
      name: 'userManage',
      hidden: false,
      meta: { title: '用户管理', icon: 'iconfont icon-shangpinguanli' },
      component: () =>
        import('@/pages/User')
    }]
  },
  {
    path: '/systemManage',
    name: 'systemManage',
    hidden: false,
    component: Layout,
    meta: { title: '系统管理', icon: 'iconfont icon-system' },
    children: [
      {
        path: '/roleManage',
        name: 'roleManage',
        meta: { title: '角色管理' },
        component: () => import('@/pages/System/role')
      },
      {
        path: '/expressManage',
        name: 'expressManage',
        meta: { title: '快递管理' },
        component: () => import('@/pages/System/express')
      },
      {
        path: '/logsManage',
        name: 'logsManage',
        meta: { title: '日志管理' },
        component: () => import('@/pages/System/logs')
      }
    ]
  }
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers
})
// router.beforeEach((to, from, next) => {
//   const loginState = sessionStorage['token'] ? true : false
//   if(to.path == '/login' || to.path == '/register') {
//     next()
//   } else {
//     if(loginState) {
//       next()
//     } else {
//       next({path: '/login'})
//     }
//   }
// })
export default router