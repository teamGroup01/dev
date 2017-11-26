import {
  constantRouterMap,
  asyncRouterMap
} from '@/router'

function hasPermission(route, roles) {
  if (route.meta && route.meta.role) {
    return route.some(role => route.meta.role.indexOf(role) > -1)
  } else {
    return false
  }
}

function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })

  return accessedRouters
}
export const permission = {
  state: {
    routers: constantRouterMap,
    addRoutes: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRoutes = routers
      state.routers = state.routers.cancat(routers)
    }
  },
  action: {
    GenerateRouters({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          roles
        } = data
        let accessedRoutes

        if (roles.indexOf('admin' > -1)) {
          accessedRoutes = asyncRouterMap
        } else {
          accessedRoutes = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRoutes)
        resolve()
      })
    }
  }
}
