/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./1.js":
/*!**************!*\
  !*** ./1.js ***!
  \**************/
/***/ (() => {

eval("class Super {}\n\nclass Sub extends Super {\n  constructor() {\n    super();\n  }\n}\nlet sub = new Sub();\nconsole.log(Sub.__proto__ === Super);\nconsole.log(Sub.prototype.__proto__ === Super.prototype);\nconsole.log(sub.__proto__.__proto__ === Super.prototype);\n\n// webpack打包后\n\nlet reg = /\\n\\n/g;\nlet str =\n  \"class Super {}\\n\\nclass Sub extends Super {\\n  constructor() {\\n    super();\\n  }\\n}\\nlet sub = new Sub();\\nconsole.log(Sub.__proto__ === Super);\\nconsole.log(Sub.prototype.__proto__ === Super.prototype)\";\n\nconsole.log(str.replace(reg, ''))\n\n//# sourceURL=webpack://class/./1.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./1.js"]();
/******/ 	
/******/ })()
;