//! 当从模块中导入一个变量时，它就好像使用const定义的一样(很重要，这也是为什么导入的常量是不可以改变的，而引用类型是可以改变的)
//! 无论我们在一个模块中导入另个一个模块多少次， 这个模块只会执行一次， 之后都会从内存中读取。
//! ES6 中，imports 是 exprts 的只读视图，直白一点就是，imports 都指向 exports 原本的数据
//! ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
//! 静态分析 

// 导入单个
// import { fn1 } from "./a.js";
// 导入多个 
// import {fn1, fn2} from "./a.js"
//  导入整个模块
// import * as M from "./a.js"

import { count, pCount } from "./export.js"
// count = 666//不可修改
console.log(count)
pCount()
console.log(count)
