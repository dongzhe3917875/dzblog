<template lang="jade">
h1 55555555555555555555
div.imitate_select.age-select.vueSelect
  div.show_select(v-bind:class="{noborder: ifnoborder}" v-on:click="show_select_click")
    span.show_item(v-text="initdata")
    span.caret-wrap
  ul.select_all(v-bind:class="{hide_select: if_hide_select}")
    li.select_item(v-for="(index, item) in selectsingle" v-text="item" v-on:click="item_select($event, $index)")
</template>

<script>
import { incrementCounter, changeActive } from '../javascripts/select_actions'
export default {
  vuex: {
    actions: {
      increment: incrementCounter,
      changeActive: changeActive
    }
  },
  data() {
    return {
      initdata: this.selectsingle[0],
      ifnoborder: false,
      if_hide_select: true,
      current: this.selectsingle[0],
      documentEvent: false
    };
  },
  props: ["selectsingle", "index", "active"],
  computed: {

  },
  ready() {
    if (!this.documentEvent) {
      document.addEventListener("click", function(event) {
        this.ifnoborder = false;
        this.if_hide_select = true;
      }.bind(this))
      this.documentEvent = true;
    }
  },
  watch: {
    active: function(val, oldval) {
      if (!val) {
        this.ifnoborder = false;
        this.if_hide_select = true;
      }
    }
  },
  attached() {},
  methods: {
    show_select_click (event) {
      event.stopPropagation();
      this.ifnoborder = !this.ifnoborder;
      this.if_hide_select = !this.if_hide_select;
      this.increment()
      this.changeActive(this.index);
    },
    item_select (event, index) {
      event.stopPropagation();
      this.current = this.selectsingle[index];
      this.initdata = this.current;
      this.ifnoborder = false;
      this.if_hide_select = true;
    }
  },
  components: {}
};

// 我们有了一个新对象 vuex.actions，包含着新的 action。
// 我们没有指定特定的 store, object, state 等等。Vuex 会自动把它们串联好。
// 我们可以用 this.increment() 在任何方法中调用此 action。
// 我们也可以通过 @click 参数调用它，与使用其他普通的 Vue 组件方法并无二致。
// 我们给 action 起名叫 incrementCounter，但是在具体使用时，我们可以根据需要进行重新命名。
</script>

<style lang="css">
</style>
