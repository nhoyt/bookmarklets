/*
*   lists.js: bookmarklet script for highlighting HTML list elements
*/

import * as dom from './utils/dom';
import * as dialog from './utils/dialog';

(function () {
  var targetList = [
    {selector: "dl", color: "olive",  label: "dl"},
    {selector: "ol", color: "purple", label: "ol"},
    {selector: "ul", color: "navy",   label: "ul"}
  ];

  var selectors = targetList.map(function (tgt) {return tgt.selector;}).join(', ');
  var msgTitle  = "Lists";
  var msgText   = "No list elements (" + selectors + ") found.";
  var className = dom.listsCss;

  window.accessibility = function (flag){
    dialog.hide();
    window.a11yShowLists = (typeof flag === "undefined") ? true : !flag;
    if (window.a11yShowLists){
      if (dom.addNodes(targetList, className, true) === 0) {
        dialog.show(msgTitle, msgText);
        window.a11yShowLists = false;
      }
    }
    else {
      dom.removeNodes(className);
    }
  };

  window.addEventListener('resize', function (event) {
    dom.removeNodes(className);
    dialog.resize();
    window.a11yShowLists = false;
  });

  window.accessibility(window.a11yShowLists);
})();
