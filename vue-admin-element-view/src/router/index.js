import Vue from 'vue'
import VueRouter from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(VueRouter)

import Layout from '@/views/layout/Container'

export const constantRouterMap = [{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: '首页',
  children: [{
    path: 'dashboard',
    component: _import('dashboard/index')
  }]
}, {
  path: '/login',
  component: _import('login/index')
}, {
  path: '/authredirect',
  component: _import('login/authredirect')
}, {
  path: '/401',
  component: _import('errorPage/401')
}, {
  path: '/404',
  component: _import('errorPage/404')
}]

export const asyncRouterMap = [{
  path: '/realtime',
  component: Layout,
  redirect: '/realtime/index',
  children: [{
    path: 'index',
    name: '实时',
    icon: 'excel',
    meta: {
      role: ['admin', 'regionalManager', 'districtManager', 'group']
    },
    component: _import('realtime/index')
  }]
}, {
  path: '/trendday',
  component: Layout,
  redirect: '/trendday/index',
  children: [{
    path: 'index',
    icon: 'excel',
    name: '按天趋势',
    meta: {
      role: ['admin', 'regionalManager', 'districtManager', 'group', 'dealer']
    },
    component: _import('trendday/index')
  }]
}, {
  path: '/timelongpage',
  component: Layout,
  name: '时长页面',
  redirect: '/timelongpage/index',
  children: [{
    path: 'index',
    name: '时长页面',
    icon: 'excel',
    meta: {
      role: ['admin', 'regionalManager', 'districtManager', 'group', 'dealer']
    },
    component: _import('timelongpage/index')
  }]
}, {
  path: '/manager',
  component: Layout,
  redirect: '/manager/account',
  name: '管理设置',
  meta: {
    role: ['admin']
  },
  children: [{
    path: 'account',
    name: '账户管理',
    icon: 'excel',
    meta: {
      role: ['admin']
    },
    component: _import('manager/Account')
  }, {
    path: 'dealer',
    name: '经销商管理',
    icon: 'excel',
    meta: {
      role: ['admin']
    },
    component: _import('manager/Dealer')
  }, {
    path: 'ap',
    name: 'AP设置管理',
    icon: 'excel',
    meta: {
      role: ['admin']
    },
    component: _import('manager/Ap')
  }]
}, {
  path: '/error',
  component: Layout,
  redirect: 'noredirect',
  name: '错误页面',
  icon: '404',
  children: [{
    path: '401',
    component: _import('errorPage/401'),
    name: '401'
  }, {
    path: '404',
    component: _import('errorPage/404'),
    name: '404'
  }]
}]

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
