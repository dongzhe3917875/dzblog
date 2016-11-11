<template lang="jade">
  div.app
    h1 购物车案例
    hr
    h2 商品
    product-list
</template>

<script>
  import productList from './product_list.vue'
  export default {
    components: {
      productList
    }
  }
</script>
