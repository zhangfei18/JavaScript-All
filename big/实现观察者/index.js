var Event = {
  // 通过on接口监听事件eventName
  // 如果事件eventName被触发，则执行callback回调函数
  on: function (eventName, callback) {
    //你的代码
    if (this.events === undefined) {
      //   this.events = {};
      Object.defineProperty(this, "events", {
        value: {},
        enumerable: false,
        configurable: true,
        writable: true,
      });
    }
    if (this.events[eventName] === undefined) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  },
  // 触发事件 eventName
  emit: function (eventName) {
    //你的代码
    let callbacks = this.events[eventName];
    callbacks &&
      callbacks.forEach((cb) => {
        cb(...[...arguments].slice(1));
      });
  },
};
// 测试1===>
Event.on("test", function (result) {
  console.log(result);
});
Event.on("test", function () {
  console.log("test");
});
Event.emit("test", "hello world"); // 输出 'hello world' 和 'test'

// 测试2
var person1 = {};
var person2 = {};
Object.assign(person1, Event);
Object.assign(person2, Event);
person1.on("call1", function () {
  console.log("person1");
});
person2.on("call2", function () {
  console.log("person2");
});
person1.emit("call1"); // 输出 'person1'
person1.emit("call2"); // 没有输出
person2.emit("call1"); // 没有输出
person2.emit("call2"); // 输出 'person2'

// ! qqqq
// ? qqqq
// * hahah
//  TODO niubi 