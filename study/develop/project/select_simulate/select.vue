<template lang="jade">
  div
    select-simulate(v-for="(index, item) in getInfo" v-bind:selectsingle="item.content" v-bind:index="index" v-bind:active="item.active")
  span(v-text="counterValue")
</template>

<script>
import selectSimulate from './select_simulate.vue'
import store from '../javascripts/select_store'
import { getCount, getInfo } from '../javascripts/select_getters'
console.log(getInfo)
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {
  },
  store,
  attached() {},
  methods: {},
  components: {
    selectSimulate
  },
  vuex: {
    getters: {
      counterValue: getCount,
      getInfo
    }
  }
};
</script>

<style lang="css">
</style>
