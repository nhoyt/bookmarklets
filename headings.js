/*
*   headings.js: bookmarklet script for highlighting HTML heading elements
*/

import * as dom from './utils/dom';
import * as dialog from './utils/dialog';

(function () {
  var targetList = [
    {selector: "h1", color: "navy",   label: "h1"},
    {selector: "h2", color: "olive",  label: "h2"},
    {selector: "h3", color: "purple", label: "h3"},
    {selector: "h4", color: "green",  label: "h4"},
    {selector: "h5", color: "gray",   label: "h5"},
    {selector: "h6", color: "brown",  label: "h6"}
  ];

  var selectors = targetList.map(function (tgt) {return tgt.selector;}).join(', ');
  var msgTitle  = "Headings";
  var msgText   = "No heading elements (" + selectors + ") found.";
  var className = dom.headingsCss;

  window.accessibility = function (flag) {
    dialog.hide();
    window.a11yShowHeadings = (typeof flag === "undefined") ? true : !flag;
    if (window.a11yShowHeadings){
      if (dom.addNodes(targetList, className, true) === 0) {
        dialog.show(msgTitle, msgText);
        window.a11yShowHeadings = false;
      }
    }
    else {
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
