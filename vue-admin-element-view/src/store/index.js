import Vue from 'vue'
import Vuex from 'vuex'
import { app } from './modules/app'
import { user } from './modules/user'
import { permission } from './modules/permission'
import * as getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})
