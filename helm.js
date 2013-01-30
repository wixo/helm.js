//
//
//			Helm.js
//			Curry based DOM Factory Wrapper
//			https://github.com/wixo/helm.js
//
//			Usage: $div === document.createElement('div')
//
//			http://wxo.me/helm-blog to know the status on the development of this plugin
//
//			@version: 0.0.1 Alpha-2
//			@author : Juan La Jara http://juanlajara.com/
//			@date   : 2013.01.30
//			@license: I guess it should be MIT
//
//

/*jshint smarttabs:true, forin:true, noarg:true, noempty:true, eqeqeq:true, laxbreak:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, indent:4, maxerr:50 */

(function (global, scope, undefined) {
	'use strict';
			
	// Explicitly support a few good DOM libraries
	var $    = global.jQuery || global.Zepto || global.ender || function (e) { return e; },
	
	// HTML elements as listed in MDN : http://wxo.me/html5-elements
	    tags = ["html",	"head", "title", "base", "link", "meta", "style",
	            "script", "noscript",	"body", "section", "nav", "article", 
	            "aside", "h1", "h2", "h3", "h4", "h5", "h6",	"hgroup", 
	            "header", "footer", "address", "p", "hr", "pre", "blockquote",
	            "ol", "ul", "li", "dl", "dt", "dd", "figure", "figcaption", "div",
	            "a", "em", "strong", "small", "s", "cite", "q", "dfn", "abbr",
	            "data", "time", "code", "var", "samp", "kbd",	"sub", "sup", "i", 
	            "b", "u", "mark", "ruby", "rt", "rp", "bdi", "bdo", "span", "br", 
	            "wbr", "ins", "del",	"img", "iframe", "embed", "object", "param",
	            "video", "audio", "source", "track", "canvas", "map",	"area", "svg",
	            "math", "table", "caption", "colgroup", "col", "tbody", "thead", 
	            "tfoot", "tr", "td", "th", "form", "fieldset", "legend", "label",
	            "input", "button", "select", "datalist", "optgroup", "option", 
	            "textarea", "keygen", "output", "progress", "meter", "details",
	            "summary", "command", "menu"],
	    i    = tags.length,
	    defineProp;

	// Use global if no scope was declared
	scope = scope || global;

	// Define the property in the scope, prepend $ to the tagname
	defineProp = function (i) {
		Object.defineProperty(scope, '$' + tags[i], {
			get: function () {
				return $(document.createElement(tags[i]));
			},
			set: function () {
				throw new Error('Attempted to write to read-only property');
			}
		});
	};

	// Iterate through tagnames
	while (i--) {
		defineProp(i);
	}

})(window, this);