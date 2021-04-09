/**
 *防抖
 *
 */
function debounce(fn, wait = 500) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
      clearTimeout(timer);
    }, wait);
  };
}
function throttle(fn, wait = 500) {
  let timer = null;
  let preTime = 0;
  return function anonymous(...args) {
    let now = new Date();
    let remain = wait - (now - preTime);
    if (remain <= 0) {
      preTime = now;
      fn.call(...args);
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          preTime = new Date();
          fn.call(...args);
          timer = null;
          clearTimeout(timer);
        }, remain);
      }
    }
  };
}

let scrollFn = throttle(() => {
  console.log(000);
}, 1000);
window.onscroll = scrollFn;


