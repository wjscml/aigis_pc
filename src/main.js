import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, { Validator } from 'vee-validate'
import { dict } from 'common/js/messages.js'
import * as socketApi from './api/socket'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Validator.localize('en', dict)

Vue.prototype.socketApi = socketApi

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
