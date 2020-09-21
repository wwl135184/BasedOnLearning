// let命令
{
    // let a = 10;
    var b = 20;
}

// console.log(a); // a is not defined
console.log(b); // 20

// 作用域
var a = [];
for(var i = 0; i < 10; i++) {
    a[i] = () => {
        console.log(i)
    }
}

a[6](); 

var a = [];
for(let i = 0; i < 10; i++) {
    a[i] = () => {
        console.log(i);
    }
}

a[6]();

// 函数变量i与循环变量i不在同一作用域
for(let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}

console.log('============================================================');

// let 不存在变量提升 var 会发生变量提升现象

console.log('============================================================');

// 暂时性死区，在声明之前就使用这些变量，就会报错。

// typeof x; 

// let x = x; // ReferenceError

console.log('============================================================');

// 不允许重复声明

// 报错
// function func() {
//     let a = 1;
//     var a = 2;
// }

console.log('============================================================');

// 快级作用域

// ES5只有全局作用域和函数作用域，没有块级作用域

var tmp = new Date();

(function(){
    console.log(tmp); // undefined
    if(false) {
        var tmp = 'hello world'; // 变量提升
    }
}())

var s = 'hello';

for(var i = 0; i < s.length; i++) {
    console.log(s[i]);
}

console.log(i); // 泄露为全局变量

// let 增加块级作用域

(function() {
    let n = 5;
    if(true) {
        let n = 30;
    }
    console.log(n); // 块级作用域
}())

// ES6块级作用域的任意嵌套

{{{{
    {let insane = 'hello world'}
    // console.log(insane); // ReferenceError
}}}}


// 内层作用域可以定义与外层作用域的同名函数

console.log('============================================================');

// 块级作用域与函数声明

// ES5规定，函数只能在顶层作用域和函数作用域中声明，不能在块级作用域中声明

// ES6引入块级作用域，明确允许在块级作用域中声明函数

function f() {
    console.log('I am outside!');
}

(function() {
    if(false) {
        function f() {
            console.log('I am inside!');
        }
    }
    // f(); // TypeError
}())

// 块级作用域必须要有大括号{}，没有大括号，JaveScript引擎就认为不存在块级作用域

// 严格模式下，函数只能声明在当前函数的顶层

// 报错
// if(true) let x = 1; // 缺少大括号

// 不报错
if(true) {
    let x = 1;
}

console.log('============================================================');

// const 命令

// const声明一个只读的常量。一旦声明，常量的值就不能改变。

const PI = 3.1415;
console.log(PI);

// PI = 3; // TypeError

// const声明的变量不得改变值，这就意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值

// const foo; // SyntaxError

// const的作用域与let命令相同：只在声明所在的块级作用域有效

if(true) {
    const MAX = 5;
}
// console.log(MAX); // MAX id not defined

// const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用

console.log('============================================================');

// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动

const foo = {};
foo.label = 'name';
foo.value = 'value';
console.log(foo);

// 如果想将对象冻结，应该使用Object.freeze()方法

const foo1 = Object.freeze({}); // 冻结
foo1.prop = '123'; // 不生效
console.log(foo1);

console.log('============================================================');

// ES6变量的6中声明方法

// var, function, let, const, import, class

console.log('============================================================');

// 顶层对象属性

// 顶层对象，浏览器环境window对象，Node环境global对象，ES5中顶层对象的属性与全局变量是等价的

// ES6开始，全局变量将逐步与顶层对象的属性脱钩

var c = 1;
console.log(c);

let d = 2;
console.log(d);

console.log('============================================================');    

// globalThis对象

// JaveScript语言存在一个顶层对象，它提供全局环境(即去全局作用域)，所有代码都在这个环境中运行。

(typeof window !== undefined ? window 
    : (typeof process === 'object' && 
        typeof require == 'function' && 
        typeof global === 'object') 
        ? global : this);

var getGlobal = function() {
    if(typeof self !== undefined) {
        return self;
    }
    if(typeof window !== undefined) {
        return window;
    }
    if(typeof global !== undefined) {
        return global;
    }
    throw new Error('unable to locate global object');
}

