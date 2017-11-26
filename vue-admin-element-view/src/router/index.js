import Vue from 'vue'
import VueRouter from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(VueRouter)

export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index')
}]

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
