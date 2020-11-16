import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/product/:productName',
    name: 'product',
    component: () => import('../views/product.vue')
  },
  {
    path: '/lottery',
    name: 'lottery',
    component: () => import('../views/lottery.vue')
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router
