var Common = {
  get_operate_url: function(type) {
    var url_arr = location.pathname.split("/");
    url_arr.splice(url_arr.length - 1, 1, type);
    var url = url_arr.join("/");
    return url
  },
  ajax_func: function(obj) {
    var xhr = null;
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
    xhr = $.ajax(obj);
    return xhr
  }
}
module.exports = Common;
