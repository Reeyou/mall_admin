import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

Vue.use(Router)

export const routers = [{
        path: '/login',
        name: 'login',
        hidden: true,
        meta: { title: '系统登录' },
        component: () =>
            import ('@/pages/Auth/login')
    },
    {
        path: '/register',
        name: 'register',
        hidden: true,
        meta: { title: '系统注册' },
        component: () =>
            import ('@/pages/Auth/register')
    },
    {
        path: '/test',
        name: 'test',
        hidden: true,
        meta: { title: 'test' },
        component: () =>
            import ('@/pages/test')
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
                import ('@/pages/Home')
        }]
    },
    {
        path: '/productManage',
        name: 'productManage',
        hidden: false,
        meta: { title: '商品管理', icon: 'iconfont icon-shangpinguanli' },
        component: Layout,
        children: [{
                path: '/productManage',
                name: 'productManage',
                hidden: false,
                meta: { title: '商品列表' },
                component: () =>
                    import ('@/pages/Product'),
            },
            {
                path: '/addProduct',
                name: 'addProduct',
                hidden: true,
                meta: { title: '添加商品' },
                component: () =>
                    import ('@/pages/Product/add/addProduct.vue'),
            },
            {
                path: '/editProduct',
                name: 'editProduct',
                hidden: true,
                meta: { title: '编辑商品' },
                component: () =>
                    import ('@/pages/Product/editProduct.vue'),
            },
            {
                path: '/categoryManage',
                name: 'categoryManage',
                hidden: false,
                meta: { title: '分类列表' },
                component: () =>
                    import ('@/pages/Category')
            },
            {
                path: '/specsManage',
                name: 'specsManage',
                hidden: false,
                meta: { title: '规格列表' },
                component: () =>
                    import ('@/pages/Specs')
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
                import ('@/pages/Order')
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
                import ('@/pages/Pay')
        }]
    },
    {
        path: '/advertManage',
        name: 'advertManage',
        hidden: false,
        component: Layout,
        children: [{
            path: '/advertManage',
            name: 'advertManage',
            meta: { title: '广告管理', icon: 'iconfont icon-guanggao' },
            component: () =>
                import ('@/pages/Advert')
        }]
    },
    {
        path: '/contentManage',
        name: 'contentManage',
        hidden: false,
        component: Layout,
        children: [{
            path: '/contentManage',
            name: 'contentManage',
            meta: { title: '内容管理', icon: 'iconfont icon-neirongguanli' },
            component: () =>
                import ('@/pages/Content')
        }]
    },
    {
        path: '/userManage',
        name: 'userManage',
        hidden: false,
        meta: { title: '用户管理', icon: 'iconfont icon-shangpinguanli' },
        component: Layout,
        children: [{
            path: '/userManage',
            name: 'userManage',
            hidden: false,
            meta: { title: '用户列表'},
            component: () =>
                import ('@/pages/User')
        },{
            path: '/addProduct',
            name: 'addProduct',
            hidden: true,
            meta: { title: '添加商品' },
            component: () =>
                import ('@/pages/Product/add/addProduct.vue'),
        }]
    },
    {
        path: '/systemManage',
        name: 'systemManage',
        hidden: false,
        component: Layout,
        children: [{
            path: '/systemManage',
            name: 'systemManage',
            meta: { title: '系统管理', icon: 'iconfont icon-system' },
            component: () =>
                import ('@/pages/System')
        }]
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