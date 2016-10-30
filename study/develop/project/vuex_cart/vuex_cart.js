
import Vue from 'vue'
import {currency} from 'currency'
import store from 'cart_store'
import vuexCart from '../components/vuex_cart.vue'
Vue.filter('currency', 'currency');


new Vue({
  el: "#app",
  store,
  components: {
    vuexCart
  }
})
