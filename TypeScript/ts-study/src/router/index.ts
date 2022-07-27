import type { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { permission } from './permission'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [{
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index.vue'),
        name: 'index'
      },
      // 目录
      {
        path: 'base-type',
        component: () => import('@/views/ts/base-type.vue'),
        name: 'base-type'
      }
    ]
}]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export function setupRouter(app: App<Element>) {
    return new Promise((resolve, reject) => {
        app.use(router)
        permission(router)
        router.isReady().then(resolve)
    })
}

export default router