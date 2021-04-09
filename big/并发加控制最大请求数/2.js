function fet(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    });
  });
}
function requestData(
  urls = [],
  max = 3,
  callback = () => {
    console.log("执行完毕");
  }
) {
  let requestArr = [],
    i = 0;
  function toFetch() {
    if (i === urls.length) {
      // 判定都添加完后返回resolve
      return Promise.resolve();
    }
    // 通过fetch方法创建请求promise
    let fetchItem = fet(urls[i++]);
    requestArr.push(fetchItem);
    // 给每一项定义一个执行完毕删除自身的微任务
    fetchItem.then(() => {
      requestArr.splice(requestArr.indexOf(fetchItem), 1);
    });
    let result = Promise.resolve();
    if (requestArr.length === max) {
      // 当执行数组达到上限时我们通过Promise.race方法判定是否有“空位置”
      result = Promise.race(requestArr);
    }
    return result.then(() => toFetch());
  }
  toFetch()
    .then(() => {
      console.log(requestArr);
      return Promise.all(requestArr);
    })
    .then(() => {
      callback();
    });
}

requestData(["a", "b", "c", "d", "e", "f", "g", "h", "i"], 3, function (data) {
  console.log(data, "请求结果");
});

// async
async function requestData(urls = [], max = 1, callback = () => {}) {
  // 这边直接定义一个数组接受所有fetch request
  const fetchArr = [];
  const requestArr = [];
  for (const item of urls) {
    const p = fetch(item);
    fetchArr.push(p); // 如果最大限制比数组小我们才需要走这一步
    if (max <= urls.length) {
      const e = p.then(() => {
        requestArr.splice(requestArr.indexOf(p), 1);
      });
      requestArr.push(e);
      if (requestArr.length >= max) {
        await Promise.race(requestArr);
      }
    }
  }
  Promise.all(fetchArr).then(() => {
    callback();
  });
}
