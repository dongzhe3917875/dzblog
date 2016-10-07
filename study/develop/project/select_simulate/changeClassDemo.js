
var addClass = function(className) {
  this.classList.add(className);
  return this;
}

// removeClass.call($0, "noborder")
var removeClass = function(className) {
  this.classList.remove(className)
  return this;
}

// var obj = {
//   a: {
//     b: {
//       c: "dddd"
//     }
//   }
// }
var deepCopy = function(obj) {
  var str, newobj = obj.constructor === Array ? []: {};
  if (typeof obj !== "object") {
    return;
  } else if (window.JSON) {
    var str = JSON.stringify(obj);
    newobj = JSON.parse(str);
  } else {
    for (var item in obj) {
      newobj[item] = typeof obj[item] === "object"?  deepCopy(obj[item]): obj[item];
    }
  }
  return newobj;
}
var changeClass = function(options) {
  var options_value = deepCopy(options);
  for (var item in options) {
    (options[item] && Boolean(addClass.call(this, item))) || (removeClass.call(this,
      item))
  }
  function bindObjPropToDomElem(obj, domElem) {
    for (var item in obj) {
      Object.defineProperty(obj, item, {
        set: function(bool) {
          (bool && Boolean(addClass.call(domElem, item))) || (removeClass.call(domElem,
            item))
          options_value[item] = bool;
        },
        get: function() {
          return options_value[item]
        }
      });

    }
  }
  bindObjPropToDomElem(options, this);
  return this
}

var dom = document.querySelector(".changeClass");
var button = document.querySelector(".toggle");

var demo_options = {
  "changedemo": true
}
changeClass.call(dom, demo_options);
button.addEventListener("click", function(event) {
  demo_options.changedemo = !demo_options.changedemo
})


// $.fn.changeClass = function(options) {
//   var $this = $(this);
//   var default_option = {
//
//   };
//   var options_value = $.extend(true, {}, options);
//   for (var item in options) {
//     (options[item] && Boolean($this.addClass(item))) || ($this.removeClass(
//       item))
//   }
//
//   function bindObjPropToDomElem(obj, domElem) {
//     for (var item in obj) {
//       Object.defineProperty(obj, item, {
//         set: function(bool) {
//           (bool && Boolean(domElem.addClass(item))) || (domElem.removeClass(
//             item))
//           options_value[item] = bool;
//         },
//         get: function() {
//           return options_value[item]
//         }
//       });
//
//     }
//   }
//   bindObjPropToDomElem(options, $this);
//   return $this
// }
