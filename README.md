# bookmarklets

This is a temporary repository for storing all of the bookmarklets files
after porting them to a new structure based on the Babel transpiler and
webpack scaffolding. The motivations and intentions are outlined below.

* [Babel](https://babeljs.io/) enables the use of ECMAScript 2015 (ES6)
  features such as
  * modules
  * classes
  * arrow functions
  * destructuring
  
* [webpack](http://webpack.github.io/) is a module bundler that can produce
  minified output files and embedded CSS.
  
The hope is that by breaking the code down into smaller modules that more
clearly group related functions, the codebase will be easier to maintain
and modify with new features.
