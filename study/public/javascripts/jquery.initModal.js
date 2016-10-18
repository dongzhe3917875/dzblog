// modal的初始化插件
/*
{
  title: "xxxx",
  content: {
    ajax: false,
    content_template: "xxxx",
    content_data: {}
  },
  footer: {
    make_confirm: "xxxx"
    //可选，如果是去掉取消按钮，应该是
    haveCancel: false,
    autoClose: true
    //如果初始禁掉为true
    initDisabled: false
  }
}

{
  title: "xxxx",
  content: {
    ajax: true,
    content_template: "xxxx",
  },
  footer: {
    make_confirm: "xxxx"
    //可选，如果是去掉取消按钮，应该是
    haveCancel: false,
    autoClose: true
    initDisabled: false
  }
}
*/



(function($) {
  // 插件的定义
  $.fn.initModal = function(options) {
    // build main options before element iteration
    var opt = $.extend(true, {}, $.fn.initModal.defaults, options);
    var oManager = {
      clearModal: function(header, content, tip, footer) {
        header.html('');
        content.html('');
        tip.html('');
        footer.html('');
      }
    }

    function generate_slide(number, make_confirm) {
      // iterate and reformat each matched element
      if (number == 2) {
        return
          '<div class="page_list"><button type="button" class="btn btn-success modal_next_step">下一步></button></div><div class="page_list" style="display:none"><button type="button" class="btn btn-success modal_previous_step"><上一步</button><button type="button" class="btn btn-warning make_confirm">' +
          make_confirm + '</button></div>'
      } else if (number >= 3) {
        var updown = ""
        for (var i = 0; i < number - 2; i++) {
          updown = updown +
            '<div class="page_list" style="display:none"><button type="button" class="btn btn-success modal_previous_step"><上一步</button><button type="button" class="btn btn-success modal_next_step">下一步></button></div>'
        }
        return
          '<div class="page_list"><button type="button" class="btn btn-success modal_next_step">下一步></button></div>' +
          updown +
          '<div class="page_list" style="display:none"><button type="button" class="btn btn-success modal_previous_step"><上一步</button><button type="button" class="btn btn-warning make_confirm">' +
          make_confirm + '</button></div>'
      }
    }
    return this.each(function() {
      var $this = $(this);
      var modalHeader = $this.find(".modal-header");
      var modalBody = $this.find(".modal-body-content");
      var modalTip = $this.find(".modal-body-tip");
      var modalFooter = $this.find(".modal-footer");
      var modalDialog = $this.find(".modal-dialog");
      // register

      Handlebars.registerHelper("slidingcompare", function(v1) {
        return generate_slide(v1, opt.footer.make_confirm);
      });

      // 清空内容
      oManager.clearModal(modalHeader, modalBody, modalTip, modalFooter);

      // 初始化title
      modalHeader.html(dzhappy.templates.modal_header({
        title: opt.title
      }))

      // 初始化modal-boday
      if (opt.content.ajax) {
        if (opt.content.content_template) {
          modalBody.html(opt.content.content_template({}));
        } else {
          modalBody.html(dzhappy.templates.dataLoad({}));
        }

        //
      } else {
        // modalBody.html(__inline("/widget/modal/" + opt.content.content_template + ".handlebars")(opt.content.content_data));
        modalBody.html(opt.content.content_template(opt.content.content_data));
      }

      // 初始化modal的宽度
      if (opt.width) {
        modalDialog.css('width', opt.width + "px");
      }
      // 初始化modal-footer
      modalFooter.html(dzhappy.templates.modal_footer({
        make_confirm: opt.footer.make_confirm,
        haveCancel: opt.footer.haveCancel,
        autoClose: opt.footer.autoClose,
        initDisabled: opt.footer.initDisabled,
        slidingMode: opt.footer.slidingMode,
        slidingPage: opt.footer.slidingPage
      }));

      // 委托解绑定
      // if (!opt.footer.autoClose) {
      //   $this.off("click", ".make_confirm");
      // }

      $this.off("click", ".make_confirm");


    });
  };
  // 私有函数：debugging
  function debug($obj) {
    if (window.console && window.console.log)
      window.console.log('hilight selection count: ' + $obj.size());
  };
  // 插件的defaults
  $.fn.initModal.defaults = {
    width: 600,
    footer: {
      haveCancel: true,
      autoClose: false,
      initDisabled: false,
      slidingMode: false,
      slidingPage: 1
    }
  };
  // 闭包结束
})(jQuery);
