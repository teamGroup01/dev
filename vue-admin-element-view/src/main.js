import Vue from 'vue'
import router from './router'
import App from './App'
import './permission'
import './mock'
import {
  store
} from './store'

import './element.config.js' // element-ui component
import './iView.config.js' // iview-ui component

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
