import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/getPageTitle'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {

    NProgress.start()
    document.title = getPageTitle(to.meta.title)

    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    //   const { roles } = await store.dispatch('user/login')
                    const roles = ['admin']
                    await store.dispatch('permission/generateRoutes', roles).then(res => {
                        router.addRoutes(res);
                        // next({ ...to, replace: true })
                        // next(to)
                        next()
                    })
                } catch (error) {
                    // await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login');
            NProgress.done();
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
