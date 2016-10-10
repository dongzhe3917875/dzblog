var Vue = require('vue')
var selectMuti = require('select.vue')
require("select_simulate.css");
var changeClass = require('./protoChangeClass').default;
require("./jquery.select.js");
var proto_select_simulate = require("./protoSelect.js").proto_select_simulate;
// jquery select demo
var select_map = new WeakMap()
$(".imitate_select.jqselect").select({
  select_map: select_map
})

// proto changeClass demo
var dom = document.querySelector(".changeClass");
var button = document.querySelector(".toggle");

var demo_options = {
  "changedemo": true
}
changeClass.call(dom, demo_options);
button.addEventListener("click", function(event) {
  demo_options.changedemo = !demo_options.changedemo
})


// proto select demo
var domSelect = document.querySelectorAll(".protoSelect");
var select_map1 = new WeakMap();
Array.prototype.slice.call(domSelect).forEach((ele) => proto_select_simulate.call(
  ele, {
    select_map: select_map1
  }));
// proto_select_simulate.call(domSelect, {
//   select_map: select_map1
// })

// vue select demo
var select_vue = [{
  context: ["河北省", "北京市", "天津市"],
  status: false
}, {
  context: ["美国", "加拿大", "墨西哥"],
  status: false
}]
new Vue({
  el: "body",
  data: {
    select_vue
  },
  components: {
    selectMuti
  }
})
