import Vue from 'vue'
import VueRouter from 'vue-router'
import Payment from '../views/payment'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      if(to.path === '/'){
        next({ name: 'Payment' })
      }
    }
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
// router.replace({ path: '/payment?step=1', redirect: '/payment' })
export default router
