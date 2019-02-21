import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login/login.vue')
    },
    {
      path: '/',
      redirect: '/index',
      name: 'aigis',
      component: () => import('./pages/aigis/aigis.vue'),
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('./pages/index/index.vue')
        },
        {
          path: '/algorithm',
          name: 'algorithm',
          component: () => import('./pages/algorithm/algorithm.vue')
        },
        {
          path: '/algorithm/:id',
          name: 'algorithmDetail',
          component: () => import('./pages/algorithm-detail/algorithm-detail.vue')
        },
        {
          path: '/report',
          name: 'report',
          component: () => import('./pages/report/report.vue')
        },
        {
          path: '/market',
          name: 'market',
          component: () => import('./pages/market/market.vue')
        },
        {
          path: '/vip_report',
          name: 'vip_report',
          component: () => import('./pages/vip-report/vip-report.vue')
        },
        {
          path: '/vip_follow',
          name: 'vip_follow',
          component: () => import('./pages/vip-follow/vip-follow.vue')
        },
        {
          path: '/vip_value',
          name: 'vip_value',
          component: () => import('./pages/vip-value/vip-value.vue')
        }
      ]
    }
  ]
})
