<template lang="jade">
div.imitate_select.age-select.vueSelect
  div.show_select(v-bind:class="{noborder: ifnoborder}" v-on:click="show_select_click")
    span.show_item(v-text="initdata")
    span.caret-wrap
  ul.select_all(v-bind:class="{hide_select: if_hide_select}")
    li.select_item(v-for="(index, item) in selectsingle" v-text="item" v-on:click="item_select($event, $index)")
</template>

<script>
export default {
  data() {
    return {
      initdata: this.selectsingle[0],
      ifnoborder: false,
      if_hide_select: true,
      current: this.selectsingle[0],
      documentEvent: false
    };
  },
  props: ["selectsingle"],
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
  attached() {},
  methods: {
    show_select_click (event) {
      event.stopPropagation();
      this.ifnoborder = !this.ifnoborder;
      this.if_hide_select = !this.if_hide_select;
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
</script>

<style lang="css">
</style>
