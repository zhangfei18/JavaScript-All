// getter setter
class Myclass {
    get prop() {
        return "hahaha";
    }
    set prop(value) {
        console.log("setter:", value);
    }
}

let myclass = new Myclass();
// myclass.prop = "zf";
// console.log(myclass.prop);
// console.log(myclass);
// console.log(Myclass.prototype);

// super
// 在子类中必需先调用super，才能使用this

class Foo {}
class Bar extends Foo {
    constructor(name) {
        // this.name = name;//报错
        super();
        this.name = name;
    }
}
let bar = new Bar("zf");

//
class Foo2 {
    constructor(name) {
        console.log("我执行了");
        this.name = name;
    }
}

class Bar2 extends Foo2 {

}

const bar2 = new Bar2("zf"); // ReferenceError
// console.log(bar2);

class A {}
class B extends A {
    constructor() {
        super()
    }
}
let b = new B();
console.log(b instanceof A)