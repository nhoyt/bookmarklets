/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	*   headings.js: bookmarklet script for highlighting HTML heading elements
	*/

	'use strict';

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _utilsDom = __webpack_require__(1);

	var dom = _interopRequireWildcard(_utilsDom);

	var _utilsDialog = __webpack_require__(4);

	var dialog = _interopRequireWildcard(_utilsDialog);

	(function () {
	  var targetList = [{ selector: 'h1', color: 'navy', label: 'h1' }, { selector: 'h2', color: 'olive', label: 'h2' }, { selector: 'h3', color: 'purple', label: 'h3' }, { selector: 'h4', color: 'green', label: 'h4' }, { selector: 'h5', color: 'gray', label: 'h5' }, { selector: 'h6', color: 'brown', label: 'h6' }];

	  var selectors = targetList.map(function (tgt) {
	    return tgt.selector;
	  }).join(', ');
	  var msgTitle = 'Headings';
	  var msgText = 'No heading elements (' + selectors + ') found.';
	  var className = dom.headingsCss;

	  window.accessibility = function (flag) {
	    dialog.hide();
	    window.a11yShowHeadings = typeof flag === 'undefined' ? true : !flag;
	    if (window.a11yShowHeadings) {
	      if (dom.addNodes(targetList, className, true) === 0) {
	        dialog.show(msgTitle, msgText);
	        window.a11yShowHeadings = false;
	      }
	    } else {
	      dom.removeNodes(className);
	    }
	  };

	  window.addEventListener('resize', function (event) {
	    dom.removeNodes(className);
	    dialog.resize();
	    window.a11yShowHeadings = false;
	  });

	  window.accessibility(window.a11yShowHeadings);
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	*   dom.js: functions and constants for adding and removing DOM overlay elements
	*/

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.addNodes = addNodes;
	exports.removeNodes = removeNodes;

	var _overlay = __webpack_require__(2);

	/*
	*   isVisible: Recursively check element properties from getComputedStyle
	*   until document element is reached, to determine whether element or any
	*   of its ancestors has properties set that affect its visibility. Called
	*   by addNodes function.
	*/
	function isVisible(element) {

	  function isVisibleRec(_x) {
	    var _again = true;

	    _function: while (_again) {
	      var el = _x;
	      computedStyle = display = visibility = hidden = ariaHidden = undefined;
	      _again = false;

	      if (el.nodeType === Node.DOCUMENT_NODE) return true;

	      var computedStyle = window.getComputedStyle(el, null);
	      var display = computedStyle.getPropertyValue('display');
	      var visibility = computedStyle.getPropertyValue('visibility');
	      var hidden = el.getAttribute('hidden');
	      var ariaHidden = el.getAttribute('aria-hidden');

	      if (display === 'none' || visibility === 'hidden' || hidden !== null || ariaHidden === 'true') {
	        return false;
	      }
	      _x = el.parentNode;
	      _again = true;
	      continue _function;
	    }
	  }

	  return isVisibleRec(element);
	}

	/*
	*   addNodes: Use targetList to generate nodeList of elements and to
	*   each of these, add an overlay with a unique CSS class name.
	*/

	function addNodes(targetList, className, dndFlag) {
	  var counter = 0;

	  targetList.forEach(function (target) {
	    var elements = document.querySelectorAll(target.selector);

	    Array.prototype.forEach.call(elements, function (element) {
	      var boundingRect, overlayNode;
	      if (isVisible(element)) {
	        boundingRect = element.getBoundingClientRect();
	        overlayNode = (0, _overlay.createOverlay)(target, boundingRect, className);
	        if (dndFlag) (0, _overlay.addDragAndDrop)(overlayNode);
	        // overlayNode.title = getTitleText(element, target);
	        document.body.appendChild(overlayNode);
	        counter += 1;
	      }
	    });
	  });

	  return counter;
	}

	/*
	*   removeNodes: Use the unique CSS class name supplied to addNodes
	*   to remove all instances of the overlay nodes.
	*/

	function removeNodes(className) {
	  var selector = 'div.' + className;
	  var elements = document.querySelectorAll(selector);
	  Array.prototype.forEach.call(elements, function (element) {
	    document.body.removeChild(element);
	  });
	}

	/*
	*   Unique CSS class names
	*/
	var formsCss = 'a11yGfdXALm0';
	exports.formsCss = formsCss;
	var headingsCss = 'a11yGfdXALm1';
	exports.headingsCss = headingsCss;
	var imagesCss = 'a11yGfdXALm2';
	exports.imagesCss = imagesCss;
	var landmarksCss = 'a11yGfdXALm3';
	exports.landmarksCss = landmarksCss;
	var listsCss = 'a11yGfdXALm4';
	exports.listsCss = listsCss;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*
	*   overlay.js: functions for creating and modifying DOM overlay elements
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createOverlay = createOverlay;
	exports.addDragAndDrop = addDragAndDrop;

	var _utils = __webpack_require__(3);

	var zIndex = 100000;

	/*
	*   createOverlay: Create overlay div with size and position based on the
	*   boundingRect properties of its corresponding target element.
	*/

	function createOverlay(tgt, rect, cname) {
	  var node = document.createElement("div");
	  var scrollOffsets = (0, _utils.getScrollOffsets)();
	  var innerStyle = "background-color: " + tgt.color;
	  var minWidth = 34;
	  var minHeight = 27;

	  node.setAttribute("class", [cname, "oaa-element-overlay"].join(" "));
	  node.startLeft = rect.left + scrollOffsets.x + "px";
	  node.startTop = rect.top + scrollOffsets.y + "px";

	  node.style.left = node.startLeft;
	  node.style.top = node.startTop;
	  node.style.width = Math.max(rect.width, minWidth) + "px";
	  node.style.height = Math.max(rect.height, minHeight) + "px";
	  node.style.borderColor = tgt.color;
	  node.style.zIndex = zIndex;

	  node.innerHTML = "<div style=\"" + innerStyle + "\">" + tgt.label + "</div>";
	  return node;
	}

	/*
	*   addDragAndDrop: Add drag-and-drop and reposition functionality to an
	*   overlay div element created by the createOverlay function.
	*/

	function addDragAndDrop(node) {

	  function hoistZIndex(el) {
	    var incr = 100;
	    el.style.zIndex = zIndex += incr;
	  }

	  function repositionOverlay(el) {
	    el.style.left = el.startLeft;
	    el.style.top = el.startTop;
	  }

	  var labelDiv = node.firstChild;

	  labelDiv.onmousedown = function (event) {
	    (0, _utils.drag)(this.parentNode, hoistZIndex, event);
	  };

	  labelDiv.ondblclick = function (event) {
	    repositionOverlay(this.parentNode);
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
	*   utils.js: utility functions
	*/

	/*
	*   getScrollOffsets: Use x and y scroll offsets to calculate positioning
	*   coordinates that take into account whether the page has been scrolled.
	*   From Mozilla Developer Network: Element.getBoundingClientRect()
	*/
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getScrollOffsets = getScrollOffsets;
	exports.drag = drag;

	function getScrollOffsets() {
	  var t;

	  var xOffset = typeof window.pageXOffset === "undefined" ? (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.ScrollLeft == "number" ? t : document.body).ScrollLeft : window.pageXOffset;

	  var yOffset = typeof window.pageYOffset === "undefined" ? (((t = document.documentElement) || (t = document.body.parentNode)) && typeof t.ScrollTop == "number" ? t : document.body).ScrollTop : window.pageYOffset;

	  return { x: xOffset, y: yOffset };
	}

	/*
	*   drag: Add drag and drop functionality to an element by setting this
	*   as its mousedown handler. Depends upon getScrollOffsets function.
	*   From JavaScript: The Definitive Guide, 6th Edition (slightly modified)
	*/

	function drag(elementToDrag, dragCallback, event) {
	  var scroll = getScrollOffsets();
	  var startX = event.clientX + scroll.x;
	  var startY = event.clientY + scroll.y;

	  var origX = elementToDrag.offsetLeft;
	  var origY = elementToDrag.offsetTop;

	  var deltaX = startX - origX;
	  var deltaY = startY - origY;

	  if (dragCallback) dragCallback(elementToDrag);

	  if (document.addEventListener) {
	    document.addEventListener("mousemove", moveHandler, true);
	    document.addEventListener("mouseup", upHandler, true);
	  } else if (document.attachEvent) {
	    elementToDrag.setCapture();
	    elementToDrag.attachEvent("onmousemove", moveHandler);
	    elementToDrag.attachEvent("onmouseup", upHandler);
	    elementToDrag.attachEvent("onlosecapture", upHandler);
	  }

	  if (event.stopPropagation) event.stopPropagation();else event.cancelBubble = true;

	  if (event.preventDefault) event.preventDefault();else event.returnValue = false;

	  function moveHandler(e) {
	    if (!e) e = window.event;

	    var scroll = getScrollOffsets();
	    elementToDrag.style.left = e.clientX + scroll.x - deltaX + "px";
	    elementToDrag.style.top = e.clientY + scroll.y - deltaY + "px";

	    elementToDrag.style.cursor = "move";

	    if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;
	  }

	  function upHandler(e) {
	    if (!e) e = window.event;

	    elementToDrag.style.cursor = "grab";
	    elementToDrag.style.cursor = "-moz-grab";
	    elementToDrag.style.cursor = "-webkit-grab";

	    if (document.removeEventListener) {
	      document.removeEventListener("mouseup", upHandler, true);
	      document.removeEventListener("mousemove", moveHandler, true);
	    } else if (document.detachEvent) {
	      elementToDrag.detachEvent("onlosecapture", upHandler);
	      elementToDrag.detachEvent("onmouseup", upHandler);
	      elementToDrag.detachEvent("onmousemove", moveHandler);
	      elementToDrag.releaseCapture();
	    }

	    if (e.stopPropagation) e.stopPropagation();else e.cancelBubble = true;
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
	*   dialog.js: functions for creating, modifying and deleting message dialog
	*/

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.show = show;
	exports.hide = hide;
	exports.resize = resize;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _utils = __webpack_require__(3);

	var _utils2 = _interopRequireDefault(_utils);

	/*
	*   setBoxGeometry: Set the width and position of message dialog based on
	*   the width of the browser window. Called by functions resizeMessage and
	*   createMsgOverlay.
	*/
	function setBoxGeometry(dialog) {
	  var width = window.innerWidth / 3.2;
	  var left = window.innerWidth / 2 - width / 2;
	  var scroll = (0, _utils2["default"])();

	  dialog.style.width = width + "px";
	  dialog.style.left = scroll.x + left + "px";
	  dialog.style.top = scroll.y + 30 + "px";
	}

	/*
	*   createMsgDialog: Construct and position the message dialog whose
	*   purpose is to alert the user when no target elements are found by
	*   a bookmarklet.
	*/
	function createMsgDialog(handler) {
	  var dialog = document.createElement("div");
	  var button = document.createElement("button");

	  dialog.className = "oaa-message-dialog";
	  setBoxGeometry(dialog);

	  button.onclick = handler;

	  dialog.appendChild(button);
	  document.body.appendChild(dialog);
	  return dialog;
	}

	/*
	*   deleteMsgDialog: Use reference to delete message dialog.
	*/
	function deleteMsgDialog(dialog) {
	  if (dialog) document.body.removeChild(dialog);
	}

	/*
	*   show: show message dialog
	*/

	function show(title, message) {
	  var h2, div;

	  if (!window.a11yMessageDialog) window.a11yMessageDialog = createMsgDialog(hide);

	  h2 = document.createElement("h2");
	  h2.innerHTML = title;
	  window.a11yMessageDialog.appendChild(h2);

	  div = document.createElement("div");
	  div.innerHTML = message;
	  window.a11yMessageDialog.appendChild(div);
	}

	/*
	*   hide: hide message dialog
	*/

	function hide() {
	  if (window.a11yMessageDialog) {
	    deleteMsgDialog(window.a11yMessageDialog);
	    delete window.a11yMessageDialog;
	  }
	}

	/*
	*   resize: resize message dialog
	*/

	function resize() {
	  if (window.a11yMessageDialog) setBoxGeometry(window.a11yMessageDialog);
	}

/***/ }
/******/ ]);