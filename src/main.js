import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, { Validator } from 'vee-validate'
import { dict } from 'common/js/messages.js'

import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(require('vue-wechat-title'))

Vue.use(VeeValidate)
Validator.localize('en', dict)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
