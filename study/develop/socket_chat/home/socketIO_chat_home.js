var common = require("./common.js")



$(".context").on("click", ".delete_cancel", function(event) {
  $(event.target).parent().hide();
})
$(".context").on("click", ".delete_confirm", function(event) {
  var article_item = $(event.target).parents(".article_item");
  var url = article_item.data("url") +
    "/remove";
  // var url = common.get_operate_url("remove");
  var obj = {
    url: url,
    success: function(data) {
      var message = data.error || data.success;
      alert(message);
      if (data.success) {
        article_item.remove();
      }
    }
  }
  common.ajax_func.call(null, obj);
})
$(".delete").on("click", function() {
  $(this).siblings(".delete_operation").show();

})

$(".logout").on("click", function() {
  var obj = {
    url: "/logout",
    success: function(data) {
      var message = data.error || data.success;
      alert(message);
      if (data.success) {
        window.location.href = data.location;
      }
    }
  }
  common.ajax_func.call(null, obj);
})
