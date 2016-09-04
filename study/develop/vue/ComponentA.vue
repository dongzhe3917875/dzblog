<template id="child-template">
  <input v-model="msg" type="text">
  <button v-on:click="notify">Dispatch Event</button>
</template>


<script>
export default {
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  methods: {
    notify: function () {
      if (this.msg.trim()) {
        this.$dispatch('child-msg', this.msg)
        this.msg = ''
      }
    }
  }
}
</script>
<!--  It is achieved by using PostCSS to transform the following: -->
<!-- You can include both scoped and non-scoped styles in the same component: -->
<style scoped>

  input {
    color: #ff000f;
    border: 1px solid yellow;
  }
</style>
