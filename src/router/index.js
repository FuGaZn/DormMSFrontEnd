import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
  // 404 page must be placed at the end !!!
]

export const asyncRoutes = [
  {
    path: '/dorm',
    component: Layout,
    redirect: '/dorm/info',
    name: '宿舍管理',
    meta: { title: '宿舍管理', icon: 'el-icon-house', roles: ['admin', 'teacher','student'] },
    children: [
      {
        path: 'info',
        name: '宿舍信息',
        component: () => import('@/views/dorm/index'),
        meta: { title: '宿舍信息', roles: ['admin', 'teacher', 'student'] }
      },
      {
        path: 'add',
        name: '添加宿舍',
        component: () => import('@/views/dorm/add'),
        meta: { title: '添加宿舍', roles: ['admin', 'teacher'] }
      }
    ]
  },
  {
    path: '/bed',
    component: Layout,
    redirect: '/bed/info',
    name: '床位管理',
    meta: { title: '床位管理', icon: 'bed', roles: ['admin', 'student', 'teacher'] },
    children: [
      {
        path: 'info',
        name: '床位信息',
        component: () => import('@/views/bed/index'),
        meta: { title: '床位信息', roles: ['admin', 'teacher', 'student'] }
      },
      {
        path: 'add',
        name: '添加床位',
        component: () => import('@/views/bed/add'),
        meta: { title: '添加床位', roles: ['admin', 'teacher'] }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  router.options.routes = constantRoutes
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
