<template lang="jade">
  div
    select-simulate(v-for="(index, item) in selectdata" v-bind:selectsingle="item")
</template>

<script>
import selectSimulate from './select_simulate.vue'
export default {
  data() {
    return {
      
    };
  },
  props: ["selectdata"],
  computed: {},
  ready() {

  },
  attached() {},
  methods: {},
  components: {
    selectSimulate
  }
};
</script>

<style lang="css">
</style>
