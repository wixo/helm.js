// Helm.js
// 
// Curry based DOM Factory Wrapper

// usage: document.createElement('div') === $div()

// visit http://b.juanlajara.com/ to know the status on the development of this plugin

// @version: 0.0.1 Alpha-1
// @author:  Juan La Jara http://juanlajara.com/
// @date:    2012.12.10
// @license: I guess it should be MIT


// Add the Curry as learned from Angus Croll: http://javascriptweblog.wordpress.com/2010/04/05/curry-cooking-up-tastier-functions/

/*jshint smarttabs:true, forin:true, noarg:true, noempty:true, eqeqeq:true, laxbreak:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, indent:4, maxerr:50 */

(function (global) {
  'use strict';

  var toArray;

  if (typeof toArray !== 'function') {
    toArray = function toArray(leEnum) {
      return global.Array.prototype.slice.call(leEnum);
    };
  }

  if (!global.Function.prototype.curry) {
    Function.prototype.curry = function () {
      if (arguments.length < 1) {
        return this; //nothing to curry with - return function
      }
      var __method = this;
      var args = toArray(arguments);
      return function () {
        return __method.apply(this, args.concat(toArray(arguments)));
      };
    };
  }

})(window);

(function (global, scope, undefined) {
  'use strict';

      //Explicitly support a few good DOM libraries
  var $    = global.jQuery || global.Zepto || global.ender || function (e) { return e },
      //HTML elements as listed in MDN : https://developer.mozilla.org/en-US/docs/HTML/HTML5/HTML5_element_list.
      tags = ["html",                                                                                                     //Root element
              "head", "title", "base", "link", "meta", "style",                                                           //Document metadata
              "script", "noscript",                                                                                       //Scripting
              "body", "section", "nav", "article", "aside",                                                               //Sections
              "h1", "h2", "h3", "h4", "h5", "h6",                                                                         //
              "hgroup", "header", "footer", "address",                                                                    //
              "p", "hr", "pre", "blockquote", "ol", "ul", "li", "dl", "dt", "dd", "figure", "figcaption", "div",          //Grouping content
              "a", "em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "data", "time", "code", "var", "samp", "kbd",//Text-level semantics
              "sub", "sup", "i", "b", "u", "mark", "ruby", "rt", "rp", "bdi", "bdo", "span", "br", "wbr",                 //
              "ins", "del",                                                                                               //Edits
              "img", "iframe", "embed", "object", "param", "video", "audio", "source", "track", "canvas", "map",          //Embedded content
              "area", "svg", "math",                                                                                      //
              "table", "caption", "colgroup", "col", "tbody", "thead", "tfoot", "tr", "td", "th",                         //Tabular data
              "form", "fieldset", "legend", "label", "input", "button", "select", "datalist", "optgroup", "option",       //Forms
              "textarea", "keygen", "output", "progress", "meter",                                                        //
              "details", "summary", "command", "menu"],                                                                   //Interactive elements
      //Returns the Created Element
      $h   = function (name) { 
              return $(document.createElement(name));
          },
      i    = tags.length;

  //Since we are populating the window scope you can build a custom plugin that populates some namespace.
  scope = scope || global;

  while (i--) {
    //Populates the scope with the Html handlers, we prepend the '$' symbol as some developers use it to indicate a DOM element.
    scope['$' + tags[i]] = $h.curry(tags[i]);
  }

})(window, window);