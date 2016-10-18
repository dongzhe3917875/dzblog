// define some components
var Foo = Vue.extend({
  template: '<div class="foo">' +
    '<h2>This is Foo!</h2>' +
    '<router-view></router-view>' + // <- nested outlet
    '</div>'
})

var Bar = Vue.extend({
  template: '<p>This is bar!</p>'
})

var Baz = Vue.extend({
  template: '<p>This is baz!</p>'
})

var User = Vue.extend({
  template: '<h2>This is User!</h2>' +
    '<router-view></router-view>'
})

var userName = Vue.extend({
  template: '<p>This is {{$route.params.username}} page'
})
var userId = Vue.extend({
    template: '<p>This is userID: {{$route.params.userId}} page'
  })
  // configure router
var router = new VueRouter({
  history: true
})

router.map({
  '/foo': {
    component: Foo,
    // add a subRoutes map under /foo
    subRoutes: {
      '/': {
        // This component will be rendered into Foo's <router-view>
        // when /foo is matched. Using an inline component definition
        // here for convenience.
        component: {
          template: '<p>Default sub view for Foo</p>'
        }
      },
      '/bar': {
        // Bar will be rendered inside Foo's <router-view>
        // when /foo/bar is matched
        component: Bar
      },
      '/baz': {
        // same for Baz, but only when /foo/baz is matched
        component: Baz
      }
    }
  },
  '/user': {
    component: User,
    subRoutes: {
      "/:userId": {
        name: "user",
        component: userId
      }
    }
  }
})

// start app
var App = Vue.extend({})
router.start(App, '#app')
