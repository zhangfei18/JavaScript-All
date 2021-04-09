// ====
class Parent {
    constructor() {
      this.tag = "A";
      this.name = "parent name";
    }
    methodA() {
      console.log("methodA in Parent");
    }
    methodB() {
      console.log(this.name);
    }
  }
  class Child extends Parent {
    constructor() {
      super();
      //调用super()之后才用引用this
      this.name = "child name";
    }
    methodA() {
      super.methodA();
      console.log("methodA in Child");
    }
  }
  const c1 = new Child();
  c1.methodA(); //methodA in Parent // methodA in Child
  