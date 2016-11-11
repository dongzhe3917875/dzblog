var common = require("./common.js");
require("./jquery.paginator.js");
var Paginator = require("./table_paginator.js")
require("./jquery.initModal.js")

require("common.css");
require("modal.css");
require("paginator.css");
require("socketIO_chat_home.css");


// 删除取消
$(".context").on("click", ".delete_cancel", function(event) {
  $(event.target).parent().hide();
})

// 删除确定
$(".context").on("click", ".delete_confirm", function(event) {
  var article_item = $(event.target).parents(".article_item");
  var version = $(this).data("version");
  console.log(version);
  var url = article_item.data("url") +
    "/remove";
  // var url = common.get_operate_url("remove");
  var obj = {
    url: url,
    data: {
      version: version
    },
    success: function(data) {
      var message = data.error || data.success;
      alert(message);
      if (data.success) {
        article_item.remove();
        var version = data.version;
        $(".sidebar").find("[data-version=" + "'" + String(version) +
          "'" + "]").text(
          String(version) + "版本 (" + data.count + "篇文档)")
      }
    }
  }
  common.ajax_func.call(null, obj);
})

// 删除显示
$(".context").on("click", ".delete", function() {
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

// 评论
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

// 退出
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

// test
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

// 分页
$(document).ready(function() {
  var paginate_init = function() {
    var paginate = $(".paginate_wrapper .pagination");
    var totalCountsText = $(".totalPage").text()
    var totalCounts = totalCountsText && parseInt(/\d+/.exec(
      totalCountsText)[
      0]);
    var currentPage = 1;
    var offset = 0;
    var pageSize = 5;
    var xhr = null;
    paginate.length && totalCounts != 0 && $.jqPaginator(paginate, {
      totalCounts: totalCounts,
      visiblePages: 3,
      pageSize: pageSize,
      currentPage: currentPage,
      onPageChange: function(num, type) {
        // 当点击过快的时候 如果上一次请求还未结束， 将上一次的请求abort掉
        // 这样就能避免异步带来的问题
        xhr && xhr.abort();
        console.log(num, type);
        offset = pageSize * (num - 1);
        var obj = {
          url: location.pathname + "/slice",
          data: {
            offset: offset,
            pageSize: pageSize
          },
          beforeSend: function() {
            console.log("aaaa")
          },
          // dataType: "html",
          success: function(data) {
            $(".article_wrapper").html(data.content);
            console.log(data);
            var message = data.error || data.success;
            if (data.success) {

            }
          }
        }
        xhr = common.ajax_func.call(null, obj);
      }
    });
  }
  paginate_init();
  $(".content").on('click', ".version_articles", function() {
    var version = $(this).data("version");
    var obj = {
      url: "/blog/get_version",
      data: {
        offset: 0,
        pageSize: 5,
        version: version
      },
      success: function(data) {
        $(".article_wrapper").html(data.content);
      }
    }
    common.ajax_func.call(null, obj);
  })
})


$(document).ready(function() {
  if (Handlebars !== undefined && dzhappy && !($("#index").text() == "true")) {
    var sidebar = document.querySelector(".sidebar");
    var context = document.createElement("div");
    context.id = "contextmenu";
    context.className = "hidden";
    var headerHeight = document.querySelector(".header").offsetHeight;
    context.innerHTML = dzhappy.templates.blog_menu({});
    sidebar.appendChild(context);

    function closeContextMenu() {
      return false;
    }

    function closeNewContextMenu(event) {
      context.className = "hidden";
    }

    function openNewContextMenu(event) {
      event = event || window.event;
      var btn = event.button;
      console.log(btn);
      // 判断是否是鼠标右键
      if (btn == 2) {
        console.log(event.clientX, event.clientY)
        context.style.left = event.clientX + "px";
        context.style.top = event.clientY - headerHeight + "px";
        context.className = "show";
      }
    }

    function getContextMenuPosition(event) {
      var x = event.clientX;
      var y = event.clientY - headerHeight;
      var vx = document.documentElement.clientWidth;
      var vy = document.documentElement.clientHeight;
      var wm = menu.offsetWidth;
      var wh = menu.offsetHeight;
      return {
        left: x + wm > vx ? (vx - wm) : x,
        top: y + wh > vy ? (vy - wh) : y
      }
    }
    $(sidebar).on("contextmenu", closeContextMenu);
    $(document).on("mousedown", closeNewContextMenu);
    $(sidebar).on("mouseup", "li", openNewContextMenu);
  }
})



$(document).ready(function() {
  var admin = {
    modal: $("#Modal"),
    showTipSuccess: function(message) {
      this.modal.find(".modal-body-tip").html(dzhappy.templates.modal_tip({
        tip_type: "alert-success",
        tip_content: message
      }));
      setTimeout(function() {
        this.modal.modal('hide');
      }.bind(this), 1000)
    },
    showTipError: function(message) {
      this.modal.find(".modal-body-tip").html(dzhappy.templates.modal_tip({
        tip_type: "alert-danger",
        tip_content: message
      }));
    }
  };
  admin.create_version = (function(_this) {
    return {
      init: function() {
        this.clickBtn = ".create_new_version"
      },
      bind: function() {
        $(document).on("click", this.clickBtn, function() {
          _this.modal.initModal({
            title: "添加版本号",
            content: {
              ajax: false,
              content_template: dzhappy.templates.create_new_version,
              content_data: {}
            },
            footer: {
              make_confirm: "确定",
              initDisabled: false
            }
          });
          // _this.modal.on("click", ".make_confirm", function() {
          //   console.log("hahhaha")
          // })
          _this.modal.on("click", ".make_confirm", this.makeConfirmClick
            .bind(this))
        }.bind(this));
      },
      makeConfirmClick: function() {
        var version = $("#version").val();
        var obj = {
          url: "/blog/create_new_version",
          data: {
            version,
          },
          success: function(data) {
            console.log(data);
            var message = data.error || data.success;
            if (data.success) {
              $(".context_wrapper .sidebar").html(dzhappy.templates
                .render_version_list(data));
              return _this.showTipSuccess(data.success);
            }
            return _this.showTipError(data.error);
          }
        }
        common.ajax_func.call(null, obj);
      },
      startUp: function() {
        this.init();
        this.bind();
      }
    }
  })(admin)
  admin.create_version.startUp();
})
