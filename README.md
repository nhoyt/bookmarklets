# bookmarklets

This is a temporary repository for storing all of the bookmarklet files
after porting them to a new structure based on the Babel transpiler and
webpack module bundler. The motivations and intentions are outlined below.

* [Babel](https://babeljs.io/) enables the use of ECMAScript 2015 (ES6)
  features such as
  * modules
  * classes
  * arrow functions
  * destructuring

* [webpack](http://webpack.github.io/) handles module dependencies and
  produces minified output files and embedded CSS.

By breaking down the code into smaller modules that group related functions,
the objective is a codebase that will be easier to maintain and modify with
new features.
