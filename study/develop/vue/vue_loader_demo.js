var Vue = require('vue')
// require a *.vue component
//var App = require('./src/components/App.vue')
var App = require('App.vue')

new Vue({
  el: "body",
  components: {
    app: App
  }
})
