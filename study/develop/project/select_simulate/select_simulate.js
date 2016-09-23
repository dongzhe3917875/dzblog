require("select_simulate.css");
require("./jquery.changeClass.js");
jQuery(document).ready(function($) {
  var show_select = ".show_select";
  var imitate_select = $(".imitate_select");
  var show_select_option = {
    "noborder": false
  }

  $(show_select).changeClass(show_select_option)
  $(show_select).on("click", function(event) {
    var target = $(event.target);
    show_select_option["noborder"] = !show_select_option["noborder"]
  })
});
