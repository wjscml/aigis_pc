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
      redirect: '/login',
      name: 'aigis',
      component: () => import('./pages/aigis/aigis.vue'),
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('./pages/index/index.vue'),
          meta: {
            title: '首页 - Aigis - 埃癸斯风险控制系统'
          }
        },
        {
          path: '/algorithm',
          name: 'algorithm',
          component: () => import('./pages/algorithm/algorithm.vue'),
          meta: {
            title: '精选策略 - Aigis - 埃癸斯风险控制系统'
          }
        },
        {
          path: '/algorithm/:id',
          name: 'algorithmDetail',
          component: () => import('./pages/algorithm-detail/algorithm-detail.vue')
        },
        {
          path: '/index/news/:id',
          name: 'newsDetail',
          component: () => import('./pages/news-detail/news-detail.vue')
        },
        {
          path: '/report',
          name: 'report',
          component: () => import('./pages/report/report.vue'),
          meta: {
            title: '深度报告 - Aigis - 埃癸斯风险控制系统'
          }
        },
        {
          path: '/report/:id',
          name: 'reportDetail',
          component: () => import('./pages/report-detail/report-detail.vue')
        },
        {
          path: '/market',
          name: 'market',
          component: () => import('./pages/market/market.vue'),
          meta: {
            title: '行情数据 - Aigis - 埃癸斯风险控制系统'
          }
        },
        {
          path: '/market/site',
          name: 'marketDetail',
          component: () => import('./pages/marketDetail/marketDetail.vue')
        },
        {
          path: '/vip_qusetion',
          name: 'vipQusetion',
          component: () => import('./pages/vip-qusetion/vip-qusetion.vue'),
          meta: {
            title: '问题解答 - Aigis - 埃癸斯风险控制系统'
          }
        },
        {
          path: '/vip_report',
          name: 'vipReport',
          component: () => import('./pages/vip-report/vip-report.vue'),
          meta: {
            title: '专享报告 - Aigis - 埃癸斯风险控制系统'
          }
        },
        {
          path: '/vip_report/:id',
          name: 'vipReportDetail',
          component: () => import('./pages/report-detail/report-detail.vue')
        },
        {
          path: '/vip_follow',
          name: 'vipFollow',
          component: () => import('./pages/vip-follow/vip-follow.vue'),
          meta: {
            title: '跟单指引 - Aigis - 埃癸斯风险控制系统'
          }
        },
        {
          path: '/vip_value',
          name: 'vipValue',
          component: () => import('./pages/vip-value/vip-value.vue'),
          meta: {
            title: '委托资管 - Aigis - 埃癸斯风险控制系统'
          }
        },
        {
          path: '/forget',
          name: 'forget',
          component: () => import('./pages/forget/forget.vue'),
          meta: {
            title: '忘记密码 - Aigis - 埃癸斯风险控制系统'
          }
        }
      ]
    },
    {
      path: '/404',
      component: () => import('./pages/not-found/not-found.vue'),
      meta: {
        title: '404 - Aigis - 埃癸斯风险控制系统'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
