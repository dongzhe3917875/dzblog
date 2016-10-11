import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
console.log(Vuex)
  // 创建一个对象来保存应用启动时的初始状态
const state = {
  count: 0,
  select_info: [{
    content: ["河北省", "北京市", "天津市"],
    active: false
  }, {
    content: ["美国", "加拿大", "墨西哥"],
    active: false
  }]
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  INCREMENT(state, amount) {
      state.count = state.count + amount;
    },
    CHANGEACTIVE(state, index) {
      state.select_info.map((ele, num) => {
        ele.active = (num == index ? true : false);
      })
    }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中

export default new Vuex.Store({
  state,
  mutations
})
