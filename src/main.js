import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, { Validator } from 'vee-validate'
import { dict } from './common/js/messages.js'

Vue.config.productionTip = false

Vue.use(require('vue-wechat-title'))

Vue.use(VeeValidate)
Validator.localize('en', dict)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.afterEach(() => {
  window.scrollTo(0, 0)
})
