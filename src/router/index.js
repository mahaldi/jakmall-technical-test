import Vue from 'vue'
import VueRouter from 'vue-router'
import Payment from '../views/payment'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      console.log(to,'to')
      if(to.path === '/' || !to.query.step){
        next({ path:'/payment?step=1'  })
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
export default router
