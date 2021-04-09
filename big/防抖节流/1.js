// 第一版
function throttle(fn, interval) {
  let last = 0
  return function () {
    let now = +Date.now()
    if (now - last > interval) {
      last = now
      fn.apply(this, arguments)
    }
  }
}
function handle() {
  console.log(Math.random())
}

// setInterval(throttle(handle, 3000), 0)

// 如果要实现在第一点击的时候也可以等待interval后触发
function throttle2(fn, interval) {
  let timer = null
  return function () {
    let now = +Date.now()
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, interval)
    }
  }
}
// setInterval(throttle2(handle, 3000), 0)

// 如果在最后一次触发不等待呢， 如果用户突然退出了页面

function throttle3(fn, interval) {
  let timer = null
  let lastTime = +Date.now()
  return function () {
    let curTime = Date.now()
    let remain = interval - (curTime - lastTime)
    clearTimeout(timer)
    if (remain <= 0) {
      console.log(1)
      fn.apply(this, arguments)
      lastTime = curTime
    } else {
      timer = setTimeout(() => {
        console.log(2)
        fn.apply(this, arguments)
        timer = null
        lastTime = curTime
      }, remain)
    }
  }
}
setInterval(throttle3(handle, 3000), 0)
