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
        $(".sidebar").find("[href='" + article_item.data("url") + "']")
          .parent().remove();
      }
    }
  }
  common.ajax_func.call(null, obj);
})
$(".delete").on("click", function() {
  $(this).siblings(".delete_operation").show();

})


var comment_submit = $(".comment_submit");
var textarea = $("textarea")
  // textarea.on("blur", function() {
  //   var value = $(this).val();
  //   if (value == "") {
  //     comment_submit.addClass("disabled");
  //   } else {
  //     comment_submit.removeClass("disabled");
  //   }
  // })
comment_submit.on("click", function() {
  var value = textarea.val();
  textarea.removeClass("empty")
  if (value.length < 5) {
    textarea.addClass("empty")
    return;
  }
  var obj = {
    url: location.pathname + "/comment",
    data: {
      comment: value
    },
    success: function(data) {
      var message = data.error || data.success;
      alert(message);
      if (data.success) {
        location.reload();
      }
    }
  }
  common.ajax_func.call(null, obj);
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
});


$(".test_jade").on("click", function() {
  var obj = {
    url: location.pathname + "/slice",
    // dataType: "html",
    success: function(data) {
      // $(".context").html(data);
      console.log(data);
      var message = data.error || data.success;
      if (data.success) {

      }
    }
  }
  common.ajax_func.call(null, obj);
})
