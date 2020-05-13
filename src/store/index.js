import Vue from 'vue';
import Vuex from 'vuex';
// import modules from './modules'
import createLogger from 'vuex/dist/logger'
import payment from './modules/payment.store'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
   modules: {
      payment
   },
   strict: debug,
   plugins: debug ? [createLogger()] : []
})