module.exports = 100;
exports = 3
module.exports = 200;
// exports只是对module.exports的引用， 当exports自己的引用指向了别的地方的话，那它就失去作用了， 因为最后导出的是mudole.exports指向的对象。