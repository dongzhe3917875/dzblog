require("select_simulate.css");
require("./jquery.changeClass.js");

function heightSlide(node, status) {
  var height = 0;
  if (status) {
    Array.prototype.slice.call(node.childNodes).forEach(
      function(child) {
        if (child.nodeType === 1) {
          var oStyle = window.getComputedStyle(child);

          height = height + child.clientHeight + (parseInt(
              oStyle.borderTopWidth) ||
            0) + (parseInt(oStyle.borderBottomWidth) || 0);
        }
      });
  }
  node.style.height = height;
}

var select_map = new WeakMap();
jQuery(document).ready(function($) {
  var show_select = ".show_select";
  var select_all = ".select_all";
  var show_item = $(".show_item");
  var imitate_select = $(".imitate_select");

  // var show_select_option = {
  //   "noborder": false
  // }
  // var show_select_all = {
  //   "hide_select": true
  // }
  // $(show_select).each(function(index, value) {
  //   select_map.set($(value)[0], {
  //     "noborder": false
  //   })
  // })
  // $(select_all).each(function(index, value) {
  //   select_map.set($(value)[0], {
  //     "hide_select": true
  //   })
  // })

  console.log(select_map);
  // $(select_all).changeClass(show_select_all);
  $(show_select).on("click", function(event) {
    event.stopPropagation();
    var target = $(this);
    if (!select_map.has(target[0])) {
      select_map.set($(target)[0], {
        "noborder": false
      })
      target.changeClass(select_map.get(target[0]))
    }


    var select_all = $(target).next();
    var select_all_node = select_all[0];

    if (!select_map.has(select_all_node)) {
      select_map.set(select_all_node, {
        "hide_select": false
      })

      $(select_all_node).changeClass(select_map.get(select_all_node))
    } else {
      select_map.get(select_all_node)["hide_select"] = !select_map.get(
        select_all_node)["hide_select"];
    }


    heightSlide(select_all_node, !select_map.get(select_all_node)[
      "hide_select"])
    select_map.get(target[0])["noborder"] = !select_map.get(target[0])[
      "noborder"];
  })

  var slideUp = function() {
    var select_all_node = $(select_all)[0];
    show_select_all["hide_select"] = true;
    show_select_option["noborder"] = false;
    heightSlide(select_all_node, false);
  }

  $(document).on("click", function(event) {
    slideUp();
  })
  $(document).on("click", ".select_item", function(event) {
    event.stopPropagation();
    var select_value = $(event.target).text();
    show_item.text(select_value);
    slideUp();
  })
});
