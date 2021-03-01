import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout'

Vue.use(Router)

/**
 * constantRoutes
 * some base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: "/",
        component: Layout,
        hidden: false,
        children: [
            { path: '/', name: 'home', meta: { title: '首页', icon: 'iconfont icon-home' }, component: () => import('@/pages/Home') }
        ]
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            { path: '/redirect/:path(.*)', component: () => import('@/pages/Redirect/index') }
        ]
    },
    {
        path: '/login',
        component: () => import('@/pages/Auth/login'),
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/pages/Auth/register'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () => import('@/pages/Auth/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/pages/Error/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/pages/Error/401'),
        hidden: true
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const _asyncRoutes = [
    {
        path: '/productManage',
        name: 'product',
        hidden: false,
        meta: { title: '商品管理', icon: 'iconfont icon-shangpinguanli', roles: ['admin'] },
        component: Layout,
        children: [
            { path: '/productManage', name: 'productManage', hidden: false, meta: { title: '商品列表' }, component: () => import('@/pages/Product'), },
            { path: '/addProduct', name: 'addProduct', hidden: true, meta: { title: '添加商品' }, component: () => import('@/pages/Product/add/addProduct.vue'), },
            { path: '/editProduct', name: 'editProduct', hidden: true, meta: { title: '编辑商品' }, component: () => import('@/pages/Product/editProduct.vue'), },
            { path: '/categoryManage', name: 'categoryManage', hidden: false, meta: { title: '分类列表' }, component: () => import('@/pages/Category') },
            { path: '/specsManage', name: 'specsManage', hidden: false, meta: { title: '规格列表' }, component: () => import('@/pages/Product/specs') }
        ]
    }
]
export const asyncRoutes = [
    {
        path: '/productManage',
        name: 'productManage',
        hidden: false,
        meta: { title: '商品管理', icon: 'iconfont icon-shangpinguanli' },
        component: Layout,
        children: [
            { path: '/productManage', name: 'productManage', hidden: false, meta: { title: '商品列表' }, component: () => import('@/pages/Product'), },
            { path: '/addProduct', name: 'addProduct', hidden: true, meta: { title: '添加商品' }, component: () => import('@/pages/Product/add/addProduct.vue'), },
            { path: '/editProduct', name: 'editProduct', hidden: true, meta: { title: '编辑商品' }, component: () => import('@/pages/Product/editProduct.vue'), },
            { path: '/categoryManage', name: 'categoryManage', hidden: false, meta: { title: '分类列表' }, component: () => import('@/pages/Category') },
            { path: '/specsManage', name: 'specsManage', hidden: false, meta: { title: '规格列表' }, component: () => import('@/pages/Product/specs') }
        ]
    },
    {
        path: '/orderManage',
        name: 'orderManage',
        hidden: false,
        component: Layout,
        children: [
            { path: '/orderManage', name: 'orderManage', meta: { title: '订单管理', icon: 'iconfont icon-order' }, component: () => import('@/pages/Order') }
        ]
    },
    {
        path: '/payManage',
        name: 'payManage',
        hidden: false,
        component: Layout,
        children: [
            { path: '/payManage', name: 'payManage', meta: { title: '支付管理', icon: 'iconfont icon-pay' }, component: () => import('@/pages/Pay') }
        ]
    },
    {
        path: '/commentManage',
        name: 'commentManage',
        hidden: false,
        component: Layout,
        children: [
            { path: '/commentManage', name: 'commentManage', hidden: false, meta: { title: '评论管理', icon: 'iconfont icon-guanggao' }, component: () => import('@/pages/Comment') }
        ]
    },
    {
        path: '/contentManage',
        name: 'contentManage',
        hidden: false,
        component: Layout,
        meta: { title: '内容管理', icon: 'iconfont icon-neirongguanli' },
        children: [
            { path: '/bannerManage', name: 'bannerManage', meta: { title: '首页轮播图管理' }, component: () => import('@/pages/Content/banner') },
            { path: '/advertManage', name: 'advertManage', meta: { title: '首页广告管理' }, component: () => import('@/pages/Content/advert') }
        ]
    },
    {
        path: '/userManage',
        name: 'userManage',
        hidden: false,
        component: Layout,
        children: [
            { path: '/userManage', name: 'userManage', hidden: false, meta: { title: '用户管理', icon: 'iconfont icon-shangpinguanli' }, component: () => import('@/pages/User') }
        ]
    },
    {
        path: '/systemManage',
        name: 'systemManage',
        hidden: false,
        component: Layout,
        meta: { title: '系统管理', icon: 'iconfont icon-system', roles: ['admin'] },
        children: [
            { path: '/roleManage', name: 'roleManage', meta: { title: '角色管理' }, component: () => import('@/pages/System/role') },
            { path: '/expressManage', name: 'expressManage', meta: { title: '快递管理' }, component: () => import('@/pages/System/express') },
            { path: '/logsManage', name: 'logsManage', meta: { title: '日志管理' }, component: () => import('@/pages/System/logs') }
        ]
    },
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router