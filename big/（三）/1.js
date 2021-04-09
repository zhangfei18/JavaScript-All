//! 实现lodash中的get函数
const get = (data, path, defaultValue = null) => {
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  /**
   * ! 对于上面的$1
   * 假如第一个参数是 RegExp对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。
   * 提示：索引是从1开始。如果不存在第 n个分组，那么将会把匹配到到内容替换为字面量。比如不存在第3个分组，就会用“$3”替换匹配到的内容。
   */
  let result = data
  for (const path of paths) {
    result = Object(null)[path] //
    if (result == null) {
      return defaultValue
    }
  }
  return result
}
//! 使用正则交换两个单词
let str = 'zhang fei'
let reg = /(\w+)\s(\w+)/
str.replace(reg, '$2 $1')

//! 柯理化
const add = (a, b, c) => a + b + c

const curry = function (fn) {
  return (temp = function (...args) {
    return args.length === fn.length
      ? fn(...args)
      : function (...arg) {
          return temp([...arg, ...args])
        }
  })
}

//? 不定参数curried(1)(2,3)() 终止条件

//! 实现async await
const sleep = (str) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(str)
    }, 1000)
  })

function asyncToGenerator(fn) {
  return function () {
    // ctx
    let that = this,
      args = arguments
    return new Promise((resolve, reject) => {
      let gen = fn.apply(that, args)//执行生成器函数
      function _next(value) {
        asyncGeneratoStep(gen, resolve, reject, _next, _throw, 'next', value)
      }
      function _throw(err) {
        asyncGeneratoStep(gen, resolve, reject, _next, _throw, 'throw', err)
      }

      _next(void 0)//第一次执行不用传参，所以传递undefined。
    })
  }
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var result = gen[key](arg) //执行next()
    var value = result.value // 获取 执行next() 返回的结果
  } catch (error) {
    reject(err)// 中途出错直接reject
    return
  }
  // 终止条件
  if (result.done) {
    resolve(value)// 遍历完成生成器直接resolve
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}
