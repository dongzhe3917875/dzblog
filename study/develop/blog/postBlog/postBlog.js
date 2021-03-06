var showdown = require("./showdown.js");
var common = require("./common.js");
$(document).ready(function() {
  var ajax_func = function(obj) {
    var defaultOption = {
      url: "",
      type: "POST",
      dataType: "json",
      data: {},
      success: function(data) {

      }
    }
    var obj = $.extend(true, {},
      defaultOption, obj);
    $.ajax(obj);
  }



  var converter = new showdown.Converter({
    "omitExtraWLInCodeBlocks": true,
    "strikethrough": true,
    "tables": true,
    "ghCodeBlocks": true
  });
  $("#context").on("keyup", function() {
    var text = $(this).val();
    var html = converter.makeHtml(text);
    console.log(html);
    $(".showhtml").html(html);
  })

  $(".post").on("click", function(event) {
    event.preventDefault();
    ajax_func({
      url: "/blog/post_blog",
      data: {
        title: $("#title").val(),
        markdown: $("#context").val(),
        post: $(".showhtml").html(),
        subject: $("#subject").val(),
        version: $("#version").val()
      },
      success: function(data) {
        if (data.error) {
          return alert(data.error);
        }
        alert(data.success);
        location.href = data.location;
      }
    })
  })

  $(".update").on("click", function(event) {
    var url = common.get_operate_url("update");
    event.preventDefault();
    ajax_func({
      url: url,
      data: {
        markdown: $("#context").val(),
        post: $(".showhtml").html(),
        subject: $("#subject").val()
      },
      success: function(data) {
        if (data.error) {
          return alert(data.error);
        }
        alert(data.success);
        location.href = data.location;
      }
    })
  })


  $(".upload").on("click", function() {
    doUpload();
  })
  $(document).on("click", ".showPreview", function() {
    $(".writeArea").hide();
    $(".showhtml").removeClass("col-sm-5").addClass("col-sm-10");
    $(this).removeClass("showPreview").addClass("hidePreview").text(
      "恢复");
  })
  $(document).on("click", ".hidePreview", function() {
    $(".writeArea").show();
    $(".showhtml").removeClass("col-sm-10").addClass("col-sm-5");
    $(this).removeClass("hidePreview").addClass("showPreview").text(
      "显示预览");
  })



  function doUpload() {
    var file = document.getElementById("file");
    var file_name = file.value;
    console.log(file_name);
    var fileObj = file.files[0];
    var fileName = file.name;
    var formData = new FormData();
    formData.append(fileName, fileObj);
    $.ajax({
      url: '/blog/upload',
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: function(returndata) {
        alert(returndata.success);
        var width = $(".width").val();
        var height = $(".height").val();
        if (width && height) {
          $("#context").val($("#context").val() + '![](/images/' +
              returndata.path + " =" + width + "x" + height + ")")
            .trigger(
              "keyup");
        } else {
          $("#context").val($("#context").val() + '![](/images/' +
              returndata.path + ")")
            .trigger(
              "keyup");
        }
      },
      error: function(returndata) {
        alert(returndata);
      }
    });
  }


});
