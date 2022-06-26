import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import Layout from '@/layout/index.vue'
import { CoffeeCup, Link } from '@element-plus/icons-vue'
import { Component, markRaw } from "vue"
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * title：menu name
     */
    title?: string
    /**
     * icon：Menu icon, the value is the same name in the src/svgs folder or the antd 
     * icon component. When the value is a component, it needs to be imported explicitly, 
     * and markRow is required
     */
    icon?: Component | string
    /**
     * external：Whether it is an external link, the link address needs to be specified 
     * in redirect when external linking
     */
    external?: boolean
    /**
     * breadcrumb：Whether to display breadcrumbs, default true
     */
    breadcrumb?: boolean
    /**
     * hidden：whether to hide in the menu
     */
    hidden?: boolean
    /**
     * keepAlive：Whether to cache the route, it will take effect only when the name 
     * defined by the page is the same as the name defined by the route
     */
    keepAlive?: boolean
  }
}

const indexRoute: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/index',
  meta: { breadcrumb: false },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/index.vue'),
      meta: { title: 'Index', icon: 'house' }
    }
  ]
}

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true, title: 'page jump' },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true, title: '404' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true },
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true, title: 'Log in' }
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Layout,
    redirect: '/modal/index',
    meta: { breadcrumb: false },
    children: [
      {
        path: 'index',
        name: 'ModalIndex',
        component: () => import('@/views/modal.vue'),
        meta: { title: 'modal box', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/https://github.com/1esse/vue-clownfish-admin',
    component: undefined,
    redirect: 'https://github.com/1esse/vue-clownfish-admin',
    meta: { title: 'github', external: true, icon: Link }
  }
]

function markRawWrap(routes: RouteRecordRaw[]) {
  routes.forEach(route => {
    if (route.meta?.icon && typeof route.meta.icon !== 'string') {
      route.meta.icon = markRaw(route.meta.icon)
    }
    if (route.children && route.children.length > 0) {
      markRawWrap(route.children)
    }
  })
  return routes
}

const router = createRouter({
  //history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: markRawWrap([indexRoute, ...routes, ...constantRoutes])
})

export default router