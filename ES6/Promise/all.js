// Promise.all

let _Promise = {};
_Promise.all = function (pArr) {
  let len = pArr.length;
  let ret = [];
  let count = 0;
  return new Promise((resolve) => {
    function done(index) {
      console.log(index, len);
      if (index === len - 1) {
        resolve(ret);
      }
    }
    for (let i = 0; i < len; i++) {
      let ressult = pArr[i]();
      ressult instanceof Promise
        ? ressult.then((data) => {
            ret[i] = data;
            done(count++);
          })
        : (ret[i] = ressult);
    }
  });
};

function p1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("p1");
    }, 1000);
  });
}
function p2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("p2");
    }, 3000);
  });
}

function p3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("p3");
    }, 2000);
  });
}
const ret = _Promise.all([p1, p2, p3]);
ret.then((data) => {
  console.log(data, "all结果");
});

