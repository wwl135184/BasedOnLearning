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
      // 基础类型
      {
        path: 'base-type',
        component: () => import('@/views/ts/base-type.vue'),
        name: 'base-type'
      },
      // 变量声明
      {
        path: 'variable-declarations',
        component: () => import('@/views/ts/variable-declarations.vue'),
        name: 'variable-declarations'
      },
      // 接口
      {
        path: 'interface',
        component: () => import('@/views/ts/interface.vue'),
        name: 'interface'
      },
      // 类
      {
        path: 'class',
        component: () => import('@/views/ts/class.vue'),
        name: 'class'
      },
      // 函数
      {
        path: 'function',
        component: () => import('@/views/ts/function.vue'),
        name: 'function'
      },
      // 泛型
      {
        path: 'genericity',
        component: () => import('@/views/ts/genericity.vue'),
        name: 'genericity'
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