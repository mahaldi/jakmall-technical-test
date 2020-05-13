import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
function lazyLoad(view){
  return() => import(`@/views/${view}`)
}

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
    component: lazyLoad('payment')
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: lazyLoad('payment')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: lazyLoad('cart')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
