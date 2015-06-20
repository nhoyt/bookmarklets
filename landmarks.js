/*
*   landmarks.js: bookmarklet script for highlighting ARIA landmarks
*/

import * as dom from './utils/dom';
import * as dialog from './utils/dialog';

(function () {
  var targetList = [
    {selector: 'aside:not([role]), [role="complementary"]', color: "brown",  label: "complementary"},
    {selector: 'body > footer, [role="contentinfo"]',       color: "olive",  label: "contentinfo"},
    {selector: '[role="application"]',                      color: "teal",   label: "application"},
    {selector: 'nav, [role="navigation"]',                  color: "green",  label: "navigation"},
    {selector: 'body > header, [role="banner"]',            color: "gray",   label: "banner"},
    {selector: '[role="search"]',                           color: "purple", label: "search"},
    {selector: 'main, [role="main"]',                       color: "navy",   label: "main"}
  ];

  var selectors = targetList.map(function (tgt) {return '<li>' + tgt.selector + '</li>';}).join('');
  var msgTitle  = "Landmarks";
  var msgText   = "No elements with ARIA Landmark roles found: <ul>" + selectors + "</ul>";
  var className = dom.landmarksCss;

  window.accessibility = function (flag) {
    dialog.hide();
    window.a11yShowLandmarks = (typeof flag === "undefined") ? true : !flag;
    if (window.a11yShowLandmarks){
      if (dom.addNodes(targetList, className, true) === 0) {
        dialog.show(msgTitle, msgText);
        window.a11yShowLandmarks = false;
      }
    }
    else {
      dom.removeNodes(className);
    }
  };

  window.addEventListener('resize', function (event) {
    dom.removeNodes(className);
    dialog.resize();
    window.a11yShowLandmarks = false;
  });

  window.accessibility(window.a11yShowLandmarks);
})();
