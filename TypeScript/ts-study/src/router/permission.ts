import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export function permission(router: Router) {
    router.beforeEach((to, from, next)=> {
        NProgress.start()
        next()
    })
    router.afterEach(() => {
        NProgress.done()
    })
}