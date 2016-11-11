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
    console.log(this.getAllProducts)
    this.getAllProducts();
    console.log(this.getAllProductsInfo)
  },
  ready () {

  }
};
</script>

<style lang="css">
</style>
