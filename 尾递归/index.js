// function feb(n) {
//   if (n < 2) return n;
//   return feb(n - 1) + feb(n - 2);
// }
// console.log(feb(5));

function feb(n) {
  return febTail(n, 0, 1);
}
function febTail(n, start, total) {
  if (n === 0) {
    return start;
  }
  return febTail(n-1, total, start + total);
}
console.log(feb(5));
