export let a = 1;
import * as module1 from "./module1.js"
// console.log(module1, 'module1')
console.log(exports, 'module1')

export let b = 2;
export let c = 3;
export function bar(){
    console.log('bar')
}