//! export可以导出多个， export default只能导出一次
//! 导出的是对外的接口
//! 导出去的基本类型的值外部不能修改
//! 导出去的引用类型的值外部可以修改， 并且是动态的。

// export var firstName = 'qiqi';
// export var lastName = 'haobenben';
// export var year = 1992;
// 等价于下面====>>>
// var firstName = 'qiqi';
// var lastName = 'haobenben';
// var year = 1992;
// export {firstName, lastName, year}
// 下面也可以===>>>
// var firstName = 'qiqi';
// var lastName = 'haobenben';
// var year = 1992;
// export {firstName as first, lastName as last, year}

//? export导出的是变量，例如： export let a = 0;/let a=0 ; export {a}, 但是不能像下面这样写：let a = 0; export a; :因为这样的写法是相当于直接导出0，这样是不被允许的。 

// 默认导出

// export default function(){};


// 
let count = 3;
export {count}
export function pCount(){
    count++;
}

