<template lang="jade">
  ul
    li(v-for = "item in getAllProductsInfo") {{ item.title }} - {{ item.price | currency }}
</template>

<script>
import { getAllProducts } from '../javascripts/cart_actions'
import { getAllProductsInfo } from '../javascripts/cart_getters'
export default {
  vuex: {
    getters: {
      getAllProductsInfo
    },
    actions: {
      getAllProducts
    }
  },
  created () {
    this.getAllProducts();
  },
  ready () {

  }
};
</script>

<style lang="css">
</style>
