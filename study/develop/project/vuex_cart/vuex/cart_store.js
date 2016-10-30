import Vue from 'vue'
import Vuex from 'vuex'
import product_list from './product_list_store'
Vue.use(Vuex)
Vue.config.debug = true
export default new Vuex.Store({
  modules: {
    product_list
  }
})
