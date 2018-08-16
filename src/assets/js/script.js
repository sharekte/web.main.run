/*!
 * Waves v0.7.2
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

(function(window, factory) {
  "use strict";

  // AMD. Register as an anonymous module.  Wrap in function so we have access
  // to root via `this`.
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return factory.apply(window);
    });
  }

  // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that support module.exports, like Node.
  else if (typeof exports === "object") {
    module.exports = factory.call(window);
  }

  // Browser globals.
  else {
    window.Waves = factory.call(window);
  }
})(typeof global === "object" ? global : this, function() {
  "use strict";

  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);
  var toString = Object.prototype.toString;
  var isTouchAvailable = "ontouchstart" in window;

  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }

  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }

  function isObject(value) {
    var type = typeof value;
    return type === "function" || (type === "object" && !!value);
  }

  function isDOMNode(obj) {
    return isObject(obj) && obj.nodeType > 0;
  }

  function getWavesElements(nodes) {
    var stringRepr = toString.call(nodes);

    if (stringRepr === "[object String]") {
      return $$(nodes);
    } else if (
      isObject(nodes) &&
      /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
      nodes.hasOwnProperty("length")
    ) {
      return nodes;
    } else if (isDOMNode(nodes)) {
      return [nodes];
    }

    return [];
  }

  function offset(elem) {
    var docElem,
      win,
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;

    docElem = doc.documentElement;

    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }

  function convertStyle(styleObj) {
    var style = "";

    for (var prop in styleObj) {
      if (styleObj.hasOwnProperty(prop)) {
        style += prop + ":" + styleObj[prop] + ";";
      }
    }

    return style;
  }

  var Effect = {
    // Effect duration
    duration: 750,

    // Effect delay (check for scroll before showing effect)
    delay: 200,

    show: function(e, element, velocity) {
      // Disable right click
      if (e.button === 2) {
        return false;
      }

      element = element || this;

      // Create ripple
      var ripple = document.createElement("div");
      ripple.className = "waves-ripple waves-rippling";
      element.appendChild(ripple);

      // Get click coordinate and element width
      var pos = offset(element);
      var relativeY = 0;
      var relativeX = 0;
      // Support for touch devices
      if ("touches" in e && e.touches.length) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }
      //Normal case
      else {
        relativeY = e.pageY - pos.top;
        relativeX = e.pageX - pos.left;
      }
      // Support for synthetic events
      relativeX = relativeX >= 0 ? relativeX : 0;
      relativeY = relativeY >= 0 ? relativeY : 0;

      var scale = "scale(" + (element.clientWidth / 100) * 3 + ")";
      var translate = "translate(0,0)";

      if (velocity) {
        translate = "translate(" + velocity.x + "px, " + velocity.y + "px)";
      }

      // Attach data to element
      ripple.setAttribute("data-hold", Date.now());
      ripple.setAttribute("data-x", relativeX);
      ripple.setAttribute("data-y", relativeY);
      ripple.setAttribute("data-scale", scale);
      ripple.setAttribute("data-translate", translate);

      // Set ripple position
      var rippleStyle = {
        top: relativeY + "px",
        left: relativeX + "px"
      };

      ripple.classList.add("waves-notransition");
      ripple.setAttribute("style", convertStyle(rippleStyle));
      ripple.classList.remove("waves-notransition");

      // Scale the ripple
      rippleStyle["-webkit-transform"] = scale + " " + translate;
      rippleStyle["-moz-transform"] = scale + " " + translate;
      rippleStyle["-ms-transform"] = scale + " " + translate;
      rippleStyle["-o-transform"] = scale + " " + translate;
      rippleStyle.transform = scale + " " + translate;
      rippleStyle.opacity = "1";

      var duration = e.type === "mousemove" ? 2500 : Effect.duration;
      rippleStyle["-webkit-transition-duration"] = duration + "ms";
      rippleStyle["-moz-transition-duration"] = duration + "ms";
      rippleStyle["-o-transition-duration"] = duration + "ms";
      rippleStyle["transition-duration"] = duration + "ms";

      ripple.setAttribute("style", convertStyle(rippleStyle));
    },

    hide: function(e, element) {
      element = element || this;

      var ripples = element.getElementsByClassName("waves-rippling");

      for (var i = 0, len = ripples.length; i < len; i++) {
        removeRipple(e, element, ripples[i]);
      }
    }
  };

  /**
   * Collection of wrapper for HTML element that only have single tag
   * like <input> and <img>
   */
  var TagWrapper = {
    // Wrap <input> tag so it can perform the effect
    input: function(element) {
      var parent = element.parentNode;

      // If input already have parent just pass through
      if (
        parent.tagName.toLowerCase() === "i" &&
        parent.classList.contains("waves-effect")
      ) {
        return;
      }

      // Put element class and style to the specified parent
      var wrapper = document.createElement("i");
      wrapper.className = element.className + " waves-input-wrapper";
      element.className = element.className + " waves-button-input";

      // Put element as child
      parent.replaceChild(wrapper, element);
      wrapper.appendChild(element);

      // Apply element color and background color to wrapper
      var elementStyle = window.getComputedStyle(element, null);
      var color = elementStyle.color;
      var backgroundColor = elementStyle.backgroundColor;

      wrapper.setAttribute(
        "style",
        "color:" + color + ";background:" + backgroundColor
      );
      element.setAttribute("style", "background-color:rgba(0,0,0,0);");
    },

    // Wrap <img> tag so it can perform the effect
    img: function(element) {
      var parent = element.parentNode;

      // If input already have parent just pass through
      if (
        parent.tagName.toLowerCase() === "i" &&
        parent.classList.contains("waves-effect")
      ) {
        return;
      }

      // Put element as child
      var wrapper = document.createElement("i");
      parent.replaceChild(wrapper, element);
      wrapper.appendChild(element);
    }
  };

  /**
   * Hide the effect and remove the ripple. Must be
   * a separate function to pass the JSLint...
   */
  function removeRipple(e, el, ripple) {
    // Check if the ripple still exist
    if (!ripple) {
      return;
    }

    ripple.classList.remove("waves-rippling");

    var relativeX = ripple.getAttribute("data-x");
    var relativeY = ripple.getAttribute("data-y");
    var scale = ripple.getAttribute("data-scale");
    var translate = ripple.getAttribute("data-translate");

    // Get delay beetween mousedown and mouse leave
    var diff = Date.now() - Number(ripple.getAttribute("data-hold"));
    var delay = 350 - diff;

    if (delay < 0) {
      delay = 0;
    }

    if (e.type === "mousemove") {
      delay = 150;
    }

    // Fade out ripple after delay
    var duration = e.type === "mousemove" ? 2500 : Effect.duration;

    setTimeout(function() {
      var style = {
        top: relativeY + "px",
        left: relativeX + "px",
        opacity: "0",

        // Duration
        "-webkit-transition-duration": duration + "ms",
        "-moz-transition-duration": duration + "ms",
        "-o-transition-duration": duration + "ms",
        "transition-duration": duration + "ms",
        "-webkit-transform": scale + " " + translate,
        "-moz-transform": scale + " " + translate,
        "-ms-transform": scale + " " + translate,
        "-o-transform": scale + " " + translate,
        transform: scale + " " + translate
      };

      ripple.setAttribute("style", convertStyle(style));

      setTimeout(function() {
        try {
          el.removeChild(ripple);
        } catch (e) {
          return false;
        }
      }, duration);
    }, delay);
  }

  /**
   * Disable mousedown event for 500ms during and after touch
   */
  var TouchHandler = {
    /* uses an integer rather than bool so there's no issues with
         * needing to clear timeouts if another touch event occurred
         * within the 500ms. Cannot mouseup between touchstart and
         * touchend, nor in the 500ms after touchend. */
    touches: 0,

    allowEvent: function(e) {
      var allow = true;

      if (/^(mousedown|mousemove)$/.test(e.type) && TouchHandler.touches) {
        allow = false;
      }

      return allow;
    },
    registerEvent: function(e) {
      var eType = e.type;

      if (eType === "touchstart") {
        TouchHandler.touches += 1; // push
      } else if (/^(touchend|touchcancel)$/.test(eType)) {
        setTimeout(function() {
          if (TouchHandler.touches) {
            TouchHandler.touches -= 1; // pop after 500ms
          }
        }, 500);
      }
    }
  };

  /**
   * Delegated click handler for .waves-effect element.
   * returns null when .waves-effect element not in "click tree"
   */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }

    var element = null;
    var target = e.target || e.srcElement;

    while (target.parentElement !== null) {
      if (
        target.classList.contains("waves-effect") &&
        !(target instanceof SVGElement)
      ) {
        element = target;
        break;
      }
      target = target.parentElement;
    }

    return element;
  }

  /**
   * Bubble the click and show effect if .waves-effect elem was found
   */
  function showEffect(e) {
    // Disable effect if element has "disabled" property on it
    if (e.target.getAttribute("disabled") !== null) {
      return;
    }

    TouchHandler.registerEvent(e);

    var element = getWavesEffectElement(e);

    if (element !== null) {
      if (e.type === "touchstart" && Effect.delay) {
        var hidden = false;

        var timer = setTimeout(function() {
          timer = null;
          Effect.show(e, element);
        }, Effect.delay);

        var hideEffect = function(hideEvent) {
          // if touch hasn't moved, and effect not yet started: start effect now
          if (timer) {
            clearTimeout(timer);
            timer = null;
            Effect.show(e, element);
          }
          if (!hidden) {
            hidden = true;
            Effect.hide(hideEvent, element);
          }
        };

        var touchMove = function(moveEvent) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          hideEffect(moveEvent);
        };

        element.addEventListener("touchmove", touchMove, false);
        element.addEventListener("touchend", hideEffect, false);
        element.addEventListener("touchcancel", hideEffect, false);
      } else {
        Effect.show(e, element);

        if (isTouchAvailable) {
          element.addEventListener("touchend", Effect.hide, false);
          element.addEventListener("touchcancel", Effect.hide, false);
        }

        element.addEventListener("mouseup", Effect.hide, false);
        element.addEventListener("mouseleave", Effect.hide, false);
      }
    }
  }

  Waves.init = function(options) {
    var body = document.body;

    options = options || {};

    if ("duration" in options) {
      Effect.duration = options.duration;
    }

    if ("delay" in options) {
      Effect.delay = options.delay;
    }

    if (isTouchAvailable) {
      body.addEventListener("touchstart", showEffect, false);
      body.addEventListener("touchcancel", TouchHandler.registerEvent, false);
      body.addEventListener("touchend", TouchHandler.registerEvent, false);
    }

    body.addEventListener("mousedown", showEffect, false);
  };

  /**
   * Attach Waves to dynamically loaded inputs, or add .waves-effect and other
   * waves classes to a set of elements. Set drag to true if the ripple mouseover
   * or skimming effect should be applied to the elements.
   */
  Waves.attach = function(elements, classes) {
    elements = getWavesElements(elements);

    if (toString.call(classes) === "[object Array]") {
      classes = classes.join(" ");
    }

    classes = classes ? " " + classes : "";

    var element, tagName;

    for (var i = 0, len = elements.length; i < len; i++) {
      element = elements[i];
      tagName = element.tagName.toLowerCase();

      if (["input", "img"].indexOf(tagName) !== -1) {
        TagWrapper[tagName](element);
        element = element.parentElement;
      }

      if (element.className.indexOf("waves-effect") === -1) {
        element.className += " waves-effect" + classes;
      }
    }
  };

  /**
   * Cause a ripple to appear in an element via code.
   */
  Waves.ripple = function(elements, options) {
    elements = getWavesElements(elements);
    var elementsLen = elements.length;

    options = options || {};
    options.wait = options.wait || 0;
    options.position = options.position || null; // default = centre of element

    if (elementsLen) {
      var element,
        pos,
        off,
        centre = {},
        i = 0;
      var mousedown = {
        type: "mousedown",
        button: 1
      };
      var hideRipple = function(mouseup, element) {
        return function() {
          Effect.hide(mouseup, element);
        };
      };

      for (; i < elementsLen; i++) {
        element = elements[i];
        pos = options.position || {
          x: element.clientWidth / 2,
          y: element.clientHeight / 2
        };

        off = offset(element);
        centre.x = off.left + pos.x;
        centre.y = off.top + pos.y;

        mousedown.pageX = centre.x;
        mousedown.pageY = centre.y;

        Effect.show(mousedown, element);

        if (options.wait >= 0 && options.wait !== null) {
          var mouseup = {
            type: "mouseup",
            button: 1
          };

          setTimeout(hideRipple(mouseup, element), options.wait);
        }
      }
    }
  };

  /**
   * Remove all ripples from an element.
   */
  Waves.calm = function(elements) {
    elements = getWavesElements(elements);
    var mouseup = {
      type: "mouseup",
      button: 1
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      Effect.hide(mouseup, elements[i]);
    }
  };

  /**
   * Deprecated API fallback
   */
  Waves.displayEffect = function(options) {
    console.error(
      "Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"
    );
    Waves.init(options);
  };

  return Waves;
});

/*
  tagsinput
*/
(function($) {
  "use strict";

  var defaultOptions = {
    tagClass: function(item) {
      return "label label-info";
    },
    itemValue: function(item) {
      return item ? item.toString() : item;
    },
    itemText: function(item) {
      return this.itemValue(item);
    },
    freeInput: true,
    addOnBlur: true,
    maxTags: undefined,
    maxChars: undefined,
    confirmKeys: [13, 44],
    onTagExists: function(item, $tag) {
      $tag.hide().fadeIn();
    },
    trimValue: false,
    allowDuplicates: false
  };

  /**
   * Constructor function
   */
  function TagsInput(element, options) {
    this.itemsArray = [];

    this.$element = $(element);
    this.$element.hide();

    this.isSelect = element.tagName === "SELECT";
    this.multiple = this.isSelect && element.hasAttribute("multiple");
    this.objectItems = options && options.itemValue;
    this.placeholderText = element.hasAttribute("placeholder")
      ? this.$element.attr("placeholder")
      : "";
    this.inputSize = Math.max(1, this.placeholderText.length);

    this.$container = $('<div class="tagsinput"></div>');
    this.$input = $(
      '<input type="text" placeholder="' + this.placeholderText + '"/>'
    ).appendTo(this.$container);

    this.$element.after(this.$container);

    var inputWidth = (this.inputSize < 3 ? 3 : this.inputSize) + "em";
    this.$input.get(0).style.cssText = "width: " + inputWidth + " !important;";
    this.build(options);
  }

  TagsInput.prototype = {
    constructor: TagsInput,

    /**
     * Adds the given item as a new tag. Pass true to dontPushVal to prevent
     * updating the elements val()
     */
    add: function(item, dontPushVal) {
      var self = this;

      if (
        self.options.maxTags &&
        self.itemsArray.length >= self.options.maxTags
      )
        return;

      // Ignore falsey values, except false
      if (item !== false && !item) return;

      // Trim value
      if (typeof item === "string" && self.options.trimValue) {
        item = $.trim(item);
      }

      // Throw an error when trying to add an object while the itemValue option was not set
      if (typeof item === "object" && !self.objectItems)
        throw "Can't add objects when itemValue option is not set";

      // Ignore strings only containg whitespace
      if (item.toString().match(/^\s*$/)) return;

      // If SELECT but not multiple, remove current tag
      if (self.isSelect && !self.multiple && self.itemsArray.length > 0)
        self.remove(self.itemsArray[0]);

      if (typeof item === "string" && this.$element[0].tagName === "INPUT") {
        var items = item.split(",");
        if (items.length > 1) {
          for (var i = 0; i < items.length; i++) {
            this.add(items[i], true);
          }

          if (!dontPushVal) self.pushVal();
          return;
        }
      }

      var itemValue = self.options.itemValue(item),
        itemText = self.options.itemText(item),
        tagClass = self.options.tagClass(item);

      // Ignore items allready added
      var existing = $.grep(self.itemsArray, function(item) {
        return self.options.itemValue(item) === itemValue;
      })[0];
      if (existing && !self.options.allowDuplicates) {
        // Invoke onTagExists
        if (self.options.onTagExists) {
          var $existingTag = $(".tag", self.$container).filter(function() {
            return $(this).data("item") === existing;
          });
          self.options.onTagExists(item, $existingTag);
        }
        return;
      }

      // if length greater than limit
      if (
        self.items().toString().length + item.length + 1 >
        self.options.maxInputLength
      )
        return;

      // raise beforeItemAdd arg
      var beforeItemAddEvent = $.Event("beforeItemAdd", {
        item: item,
        cancel: false
      });
      self.$element.trigger(beforeItemAddEvent);
      if (beforeItemAddEvent.cancel) return;

      // register item in internal array and map
      self.itemsArray.push(item);

      // add a tag element
      var $tag = $(
        '<span class="tag ' +
          htmlEncode(tagClass) +
          '">' +
          htmlEncode(itemText) +
          '<span data-role="remove"></span></span>'
      );
      $tag.data("item", item);
      self.findInputWrapper().before($tag);
      $tag.after(" ");

      // add <option /> if item represents a value not present in one of the <select />'s options
      if (
        self.isSelect &&
        !$(
          'option[value="' + encodeURIComponent(itemValue) + '"]',
          self.$element
        )[0]
      ) {
        var $option = $(
          "<option selected>" + htmlEncode(itemText) + "</option>"
        );
        $option.data("item", item);
        $option.attr("value", itemValue);
        self.$element.append($option);
      }

      if (!dontPushVal) self.pushVal();

      // Add class when reached maxTags
      if (
        self.options.maxTags === self.itemsArray.length ||
        self.items().toString().length === self.options.maxInputLength
      )
        self.$container.addClass("tagsinput-max");

      self.$element.trigger($.Event("itemAdded", { item: item }));
    },

    /**
     * Removes the given item. Pass true to dontPushVal to prevent updating the
     * elements val()
     */
    remove: function(item, dontPushVal) {
      var self = this;

      if (self.objectItems) {
        if (typeof item === "object")
          item = $.grep(self.itemsArray, function(other) {
            return (
              self.options.itemValue(other) == self.options.itemValue(item)
            );
          });
        else
          item = $.grep(self.itemsArray, function(other) {
            return self.options.itemValue(other) == item;
          });

        item = item[item.length - 1];
      }

      if (item) {
        var beforeItemRemoveEvent = $.Event("beforeItemRemove", {
          item: item,
          cancel: false
        });
        self.$element.trigger(beforeItemRemoveEvent);
        if (beforeItemRemoveEvent.cancel) return;

        $(".tag", self.$container)
          .filter(function() {
            return $(this).data("item") === item;
          })
          .remove();
        $("option", self.$element)
          .filter(function() {
            return $(this).data("item") === item;
          })
          .remove();
        if ($.inArray(item, self.itemsArray) !== -1)
          self.itemsArray.splice($.inArray(item, self.itemsArray), 1);
      }

      if (!dontPushVal) self.pushVal();

      // Remove class when reached maxTags
      if (self.options.maxTags > self.itemsArray.length)
        self.$container.removeClass("tagsinput-max");

      self.$element.trigger($.Event("itemRemoved", { item: item }));
    },

    /**
     * Removes all items
     */
    removeAll: function() {
      var self = this;

      $(".tag", self.$container).remove();
      $("option", self.$element).remove();

      while (self.itemsArray.length > 0) self.itemsArray.pop();

      self.pushVal();
    },

    /**
     * Refreshes the tags so they match the text/value of their corresponding
     * item.
     */
    refresh: function() {
      var self = this;
      $(".tag", self.$container).each(function() {
        var $tag = $(this),
          item = $tag.data("item"),
          itemValue = self.options.itemValue(item),
          itemText = self.options.itemText(item),
          tagClass = self.options.tagClass(item);

        // Update tag's class and inner text
        $tag.attr("class", null);
        $tag.addClass("tag " + htmlEncode(tagClass));
        $tag.contents().filter(function() {
          return this.nodeType == 3;
        })[0].nodeValue = htmlEncode(itemText);

        if (self.isSelect) {
          var option = $("option", self.$element).filter(function() {
            return $(this).data("item") === item;
          });
          option.attr("value", itemValue);
        }
      });
    },

    /**
     * Returns the items added as tags
     */
    items: function() {
      return this.itemsArray;
    },

    /**
     * Assembly value by retrieving the value of each item, and set it on the
     * element.
     */
    pushVal: function() {
      var self = this,
        val = $.map(self.items(), function(item) {
          return self.options.itemValue(item).toString();
        });

      self.$element.val(val, true).trigger("change");
    },

    /**
     * Initializes the tags input behaviour on the element
     */
    build: function(options) {
      var self = this;

      self.options = $.extend({}, defaultOptions, options);
      // When itemValue is set, freeInput should always be false
      if (self.objectItems) self.options.freeInput = false;

      makeOptionItemFunction(self.options, "itemValue");
      makeOptionItemFunction(self.options, "itemText");
      makeOptionFunction(self.options, "tagClass");

      // Typeahead Bootstrap version 2.3.2
      if (self.options.typeahead) {
        var typeahead = self.options.typeahead || {};

        makeOptionFunction(typeahead, "source");

        self.$input.typeahead(
          $.extend({}, typeahead, {
            source: function(query, process) {
              function processItems(items) {
                var texts = [];

                for (var i = 0; i < items.length; i++) {
                  var text = self.options.itemText(items[i]);
                  map[text] = items[i];
                  texts.push(text);
                }
                process(texts);
              }

              this.map = {};
              var map = this.map,
                data = typeahead.source(query);

              if ($.isFunction(data.success)) {
                // support for Angular callbacks
                data.success(processItems);
              } else if ($.isFunction(data.then)) {
                // support for Angular promises
                data.then(processItems);
              } else {
                // support for functions and jquery promises
                $.when(data).then(processItems);
              }
            },
            updater: function(text) {
              self.add(this.map[text]);
            },
            matcher: function(text) {
              return (
                text.toLowerCase().indexOf(this.query.trim().toLowerCase()) !==
                -1
              );
            },
            sorter: function(texts) {
              return texts.sort();
            },
            highlighter: function(text) {
              var regex = new RegExp("(" + this.query + ")", "gi");
              return text.replace(regex, "<strong>$1</strong>");
            }
          })
        );
      }

      // typeahead.js
      // if (self.options.typeaheadjs) {
      //     var typeaheadjs = self.options.typeaheadjs || {};

      //     self.$input.typeahead(null, typeaheadjs).on('typeahead:selected', $.proxy(function (obj, datum) {
      //       if (typeaheadjs.valueKey)
      //         self.add(datum[typeaheadjs.valueKey]);
      //       else
      //         self.add(datum);
      //       self.$input.typeahead('val', '');
      //     }, self));
      // }

      self.$container.on(
        "click",
        $.proxy(function(event) {
          if (!self.$element.attr("disabled")) {
            self.$input.removeAttr("disabled");
          }
          self.$input.focus();
        }, self)
      );

      if (self.options.addOnBlur && self.options.freeInput) {
        self.$input.on(
          "focusout",
          $.proxy(function(event) {
            if (
              $(".typeahead, .twitter-typeahead", self.$container).length === 0
            ) {
              self.add(self.$input.val());
              self.$input.val("");
            }
          }, self)
        );
      }

      self.$container.on(
        "keydown",
        "input",
        $.proxy(function(event) {
          var $input = $(event.target),
            $inputWrapper = self.findInputWrapper();

          if (self.$element.attr("disabled")) {
            self.$input.attr("disabled", "disabled");
            return;
          }

          switch (event.which) {
            // BACKSPACE
            case 8:
              if (doGetCaretPosition($input[0]) === 0) {
                var prev = $inputWrapper.prev();
                if (prev) {
                  self.remove(prev.data("item"));
                }
              }
              break;

            // DELETE
            case 46:
              if (doGetCaretPosition($input[0]) === 0) {
                var next = $inputWrapper.next();
                if (next) {
                  self.remove(next.data("item"));
                }
              }
              break;

            // LEFT ARROW
            case 37:
              // Try to move the input before the previous tag
              var $prevTag = $inputWrapper.prev();
              if ($input.val().length === 0 && $prevTag[0]) {
                $prevTag.before($inputWrapper);
                $input.focus();
              }
              break;
            // RIGHT ARROW
            case 39:
              // Try to move the input after the next tag
              var $nextTag = $inputWrapper.next();
              if ($input.val().length === 0 && $nextTag[0]) {
                $nextTag.after($inputWrapper);
                $input.focus();
              }
              break;
            default:
            // ignore
          }

          // Reset internal input's size
          var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
          $input.attr("size", Math.max(this.inputSize, $input.val().length));
        }, self)
      );

      self.$container.on(
        "keypress",
        "input",
        $.proxy(function(event) {
          var $input = $(event.target);

          if (self.$element.attr("disabled")) {
            self.$input.attr("disabled", "disabled");
            return;
          }

          var text = $input.val(),
            maxLengthReached =
              self.options.maxChars && text.length >= self.options.maxChars;
          if (
            self.options.freeInput &&
            (keyCombinationInList(event, self.options.confirmKeys) ||
              maxLengthReached)
          ) {
            self.add(
              maxLengthReached ? text.substr(0, self.options.maxChars) : text
            );
            $input.val("");
            event.preventDefault();
          }

          // Reset internal input's size
          var textLength = $input.val().length,
            wordSpace = Math.ceil(textLength / 5),
            size = textLength + wordSpace + 1;
          $input.attr("size", Math.max(this.inputSize, $input.val().length));
        }, self)
      );

      // Remove icon clicked
      self.$container.on(
        "click",
        "[data-role=remove]",
        $.proxy(function(event) {
          if (self.$element.attr("disabled")) {
            return;
          }
          self.remove(
            $(event.target)
              .closest(".tag")
              .data("item")
          );
        }, self)
      );

      // Only add existing value as tags when using strings as tags
      if (self.options.itemValue === defaultOptions.itemValue) {
        if (self.$element[0].tagName === "INPUT") {
          self.add(self.$element.val());
        } else {
          $("option", self.$element).each(function() {
            self.add($(this).attr("value"), true);
          });
        }
      }
    },

    /**
     * Removes all tagsinput behaviour and unregsiter all event handlers
     */
    destroy: function() {
      var self = this;

      // Unbind events
      self.$container.off("keypress", "input");
      self.$container.off("click", "[role=remove]");

      self.$container.remove();
      self.$element.removeData("tagsinput");
      self.$element.show();
    },

    /**
     * Sets focus on the tagsinput
     */
    focus: function() {
      this.$input.focus();
    },

    /**
     * Returns the internal input element
     */
    input: function() {
      return this.$input;
    },

    /**
     * Returns the element which is wrapped around the internal input. This
     * is normally the $container, but typeahead.js moves the $input element.
     */
    findInputWrapper: function() {
      var elt = this.$input[0],
        container = this.$container[0];
      while (elt && elt.parentNode !== container) elt = elt.parentNode;

      return $(elt);
    }
  };

  /**
   * Register JQuery plugin
   */
  $.fn.tagsinput = function(arg1, arg2) {
    var results = [];

    this.each(function() {
      var tagsinput = $(this).data("tagsinput");
      // Initialize a new tags input
      if (!tagsinput) {
        tagsinput = new TagsInput(this, arg1);
        $(this).data("tagsinput", tagsinput);
        results.push(tagsinput);

        if (this.tagName === "SELECT") {
          $("option", $(this)).attr("selected", "selected");
        }

        // Init tags from $(this).val()
        $(this).val($(this).val());
      } else if (!arg1 && !arg2) {
        // tagsinput already exists
        // no function, trying to init
        results.push(tagsinput);
      } else if (tagsinput[arg1] !== undefined) {
        // Invoke function on existing tags input
        var retVal = tagsinput[arg1](arg2);
        if (retVal !== undefined) results.push(retVal);
      }
    });

    if (typeof arg1 == "string") {
      // Return the results from the invoked function calls
      return results.length > 1 ? results : results[0];
    } else {
      return results;
    }
  };

  $.fn.tagsinput.Constructor = TagsInput;

  /**
   * Most options support both a string or number as well as a function as
   * option value. This function makes sure that the option with the given
   * key in the given options is wrapped in a function
   */
  function makeOptionItemFunction(options, key) {
    if (typeof options[key] !== "function") {
      var propertyName = options[key];
      options[key] = function(item) {
        return item[propertyName];
      };
    }
  }
  function makeOptionFunction(options, key) {
    if (typeof options[key] !== "function") {
      var value = options[key];
      options[key] = function() {
        return value;
      };
    }
  }
  /**
   * HtmlEncodes the given value
   */
  var htmlEncodeContainer = $("<div />");
  function htmlEncode(value) {
    if (value) {
      return htmlEncodeContainer.text(value).html();
    } else {
      return "";
    }
  }

  /**
   * Returns the position of the caret in the given input field
   * http://flightschool.acylt.com/devnotes/caret-position-woes/
   */
  function doGetCaretPosition(oField) {
    var iCaretPos = 0;
    if (document.selection) {
      oField.focus();
      var oSel = document.selection.createRange();
      oSel.moveStart("character", -oField.value.length);
      iCaretPos = oSel.text.length;
    } else if (oField.selectionStart || oField.selectionStart == "0") {
      iCaretPos = oField.selectionStart;
    }
    return iCaretPos;
  }

  /**
   * Returns boolean indicates whether user has pressed an expected key combination.
   * @param object keyPressEvent: JavaScript event object, refer
   *     http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
   * @param object lookupList: expected key combinations, as in:
   *     [13, {which: 188, shiftKey: true}]
   */
  function keyCombinationInList(keyPressEvent, lookupList) {
    var found = false;
    $.each(lookupList, function(index, keyCombination) {
      if (
        typeof keyCombination === "number" &&
        keyPressEvent.which === keyCombination
      ) {
        found = true;
        return false;
      }

      if (keyPressEvent.which === keyCombination.which) {
        var alt =
            !keyCombination.hasOwnProperty("altKey") ||
            keyPressEvent.altKey === keyCombination.altKey,
          shift =
            !keyCombination.hasOwnProperty("shiftKey") ||
            keyPressEvent.shiftKey === keyCombination.shiftKey,
          ctrl =
            !keyCombination.hasOwnProperty("ctrlKey") ||
            keyPressEvent.ctrlKey === keyCombination.ctrlKey;
        if (alt && shift && ctrl) {
          found = true;
          return false;
        }
      }
    });

    return found;
  }

  /**
   * Initialize tagsinput behaviour on inputs and selects which have
   * data-role=tagsinput
   */
  $(function() {
    $(
      "input[data-role=tagsinput], select[multiple][data-role=tagsinput]"
    ).tagsinput();
  });
})(window.jQuery);

(function($) {
  "use strict";

  $.fn.fileupload = function(options) {
    this.each(function() {
      var dropzone = $(this);
      //console.log(dropzone);
    });
  };
})(jQuery);
