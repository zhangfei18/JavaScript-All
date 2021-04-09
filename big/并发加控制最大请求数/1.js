// 请实现以下的函数，可以批量请求数据，所有的URL地址在urls参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 回调函数。发请求的函数可以直接使用 fetch 即可
function fet(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    });
  });
}
function sendRequest(urls, max, callback) {
  let i = 0;
  let requestArr = [];
  let ret = [];
  //TODO
  function done(result, i) {
    ret[i] = result;
  }
  function run() {
    if (i >= urls.length) {
      return Promise.resolve();
    }
    let requestItem = fet(urls[i++]);
    requestArr.push(requestItem);
    (function (i) {
      requestItem.then((data) => {

        done(data, i);

        requestArr.splice(requestArr.indexOf(requestItem), 1);
      });
    })(i);

    let result = Promise.resolve();
    if (i >= max) {
      result = Promise.race(requestArr);
    }
    // 递归执行
    return result.then(() => {
      // 有任务执行完成， 继续递归执行run函数
      run();
    });
  }
  run()
    .then(() => {
      return Promise.all(requestArr);
    })
    .then(() => {
      callback(ret);
    });
}

sendRequest(["a", "b", "c", "d", "e", "f", "g", "h", "i"], 3, function (data) {
  console.log(data, "请求结果");
});
