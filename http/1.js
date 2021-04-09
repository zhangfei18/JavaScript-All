function queryData() {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "http//127.0.0.1:8888", false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        resolve(result);
      }
    };
    xhr.send(null); //请求主体
  });
}

(async function () {
  // 本地缓存
  //   没有缓存/缓存失效 ->从服务器获取数据，并缓存到本地
  const cache = localStorage.getItem("cache");
  if (cache) {
    cache = JSON.parse(cache);
    let time = cache.time;
    if (+new Date() - time <= 60 * 1000) {
      console.log(cache.data);
      return;
    }
  }
  let result = await queryData();
  window.localStorage.setItem(
    "cache",
    JSON.stringify({
      time: +new Date(),
      data: JSON.stringify(result),
    })
  ); //存储的必须是字符串
})();
