import {RECEIVE_PRODUCTS} from './mutation-types'
const state = {
  all_products: []
}
/*
其中属性名和方法名都是用中括号[ ]包裹着，
里面都是一个字符串相加的表达式，这就告诉我们，用字面量（大括号{ }）定义对象的时候，
属性名和方法名可以是一个表达式
*/
const mutations = {
  // 默认接受的第一个参数是state
  [RECEIVE_PRODUCTS] (state, products) {
    console.log(products)
    state.all_products = products
  }
}

export default {
  state,
  mutations
}
