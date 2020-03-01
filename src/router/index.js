import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(Router)

export const routers = [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      meta: { title: '系统登录' },
      component: () => import('@/pages/Login')
    },
    {
      path: '/register',
      name: 'register',
      hidden: true,
      meta: { title: '系统注册' },
      component: () => import('@/pages/Login/register')
    },
    {
      path: "/",
      name: 'Layout',
      component: Layout,
      hidden: false,
      children: [
        {
          path: '/',
          name: 'home',
          meta: { title: '首页', icon: 'el-icon-house' },
          component: () => import('@/pages/Home')
        }
      ]
    },
    {
      path: '/productManage',
      name: 'productManage',
      hidden: false,
      meta: { title: '商品管理', icon: 'el-icon-collection' },
      component: Layout,
      children: [
        {
          path: '/productManage',
          name: 'productManage',
          hidden: false,
          meta: { title: '商品管理', icon: 'el-icon-reading' },
          component: () => import('@/pages/Product'),
        },
        {
          path: '/addProduct',
          name: 'addProduct',
          hidden: true,
          meta: { title: '添加商品' },
          component: () => import('@/pages/Product/addProduct.vue'),
        },
        {
          path: '/categoryManage',
          name: 'categoryManage',
          hidden: false,
          meta: { title: '分类管理', icon: 'el-icon-collection-tag' },
          component: () => import('@/pages/Category')
        }
      ]
    },
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
