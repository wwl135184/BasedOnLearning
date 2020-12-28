// 函数的扩展

// ES6允许函数设置默认值，即直接写在参数定义的后面。

{
    function log(x = 'hello', y = 'world') {
        console.log(x, y);
    }
    log(); // hello world
}

// 参数变量是默认声明的，不能使用let或const再次声明

{
    function foo(x = 5) {
        // let x = 1; // error
        // const x = 2; // error
    }
    foo();
}

// 使用默认参数时，函数不能有同名参数

{
    function foo(x = 1, y) {
        console.log(x);
    }
    // foo();
}

// 参数默认值不是传值的，而是每次重新计算默认值表达式的值

{
    let x = 99;
    function foo(p = x + 1) {
        console.log(p);
    }
    foo();
    x = 100;
    foo();
}

console.log('============================================================');

// 与解构赋值默认值结合使用

{
    function foo({x, y = 5}) {
        console.log(x, y);
    }
    foo({}); // undefined 5
    foo({x: 1}); // 1 5
    foo({x: 1, y: 2}) // 1 2
    // foo(); // error
}

{
    function foo({x, y = 6} = {}) {
        console.log(x, y);
    }
    foo(); // undefined 6
}

{
    function foo(url, { body = {}, method = 'POST', headers = {} }) {
        console.log(method);
    }
    foo('https://www.baidu.com', {}); // POST
}

// 双重赋值

{
    function foo(url, { body = {}, method = 'GET', headers = {} } = {}) {
        console.log(method);
    }
    foo('https://www.baodi.com'); // GET
}

{
    function m1({x = 0, y = 1} = {}) {
        console.log([x, y]);
    }
    function m2({x, y} = {x: 0, y: 1}) {
        console.log([x, y]);
    }
    m1(); // [0, 1]
    m2(); // [0, 1] 

    m1({x: 3, y: 4}); // [3, 4]
    m2({x: 3, y: 4}); // [3, 4]

    m1({x: 3}); // [3, 1]
    m2({x: 3}); // [3, undefined]

    m1({}); // [0, 0]
    m2({}); // [undefined, undefined]

    m1({z: 3}); // [0, 0]
    m2({z: 3}); // [undefined, undefined]
}

console.log('============================================================');

// 参数默认值的位置

// 默认值的参数，应该是函数的尾参数

{
    function foo(x, y = 5, z) {
        console.log(x, y, z);
    }
    foo(); // undefined 5 undefined
    foo(1); // 1 5 undefined
    // foo(1, , 2); // 报错
    foo(1, undefined, 2); // 1, 5, 2
}

// undefined会触发参数的默认值，null不会触发

{
    function foo(x, y = 1) {
        console.log(x, y);
    }
    foo(1, undefined); // 1 1
    foo(1, null); // 1 null
}

console.log('============================================================');

// 函数length属性

// 指定默认值以后，函数的length属性，将返回没有指定默认值的参数个数。指定默认值后，length属性将失真
{
    console.log((function foo() {}).length); // 0
    console.log((function foo(a = 1, b, c) {}).length); // 0
    console.log((function foo(a, b, c = 1) {}).length); // 2
}

console.log('============================================================');

// 作用域

// 默认值会形成一个单独的作用域(context)

{
    var x = 1;
    function f(x, y = x) {
        console.log(y);
    } 
    f(2); // 2
}

{
    let foo = 'outer';
    function bar(func = () => foo) {
        let foo = 'inner';
        console.log(func());
    }
    bar(); // outer
}

{
    var x = 1;
    function foo(x, y = function () { x = 2; }) {
        var x = 3;
        y();
        console.log(x);
    }
    foo(); // 3
    console.log(x); // 1
}

{
    var x = 1;
    function foo(x, y = function() { x = 2; }) {
        x = 3;
        y();
        console.log(x);
    }
    foo(); // 2
}

console.log('============================================================');

// 应用

{
    function throwIFMissing() {
        throw new Error('Missing parameter');
    }
    function foo(mustBeProvided = throwIFMissing()) {
        return mustBeProvided;
    }
    // foo(); // Error: Missing parameter
}

// 将默认值设为undefined，表明这个参数是可以省略的

{
    function foo(x = undefined) {
        console.log(x);
    }
    foo();
}

console.log('============================================================');
 
// rest参数 ...变量名

{
    function foo(...values) {
        let sum = 0;
        sum = values.reduce((total, item) => total += item);
        console.log(sum);
    }
    foo(1, 2, 3);
}

// rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错

{
    function foo(a, ...b) {

    }
}

// 函数的length属性，不包括rest参数

{
    console.log((function foo(a = 0, b, ...c) {}).length);
}

console.log('============================================================');

// name属性

// 函数的name属性，返回该函数的函数名

{
    var f = function() {};
    console.log(f.name);
}

{
    const bar = function foo() {}
    console.log(bar.name);
}

console.log('============================================================');

// 箭头函数

{
    const foo = (a, b) => a + b;
    console.log(foo(1, 2)); // 3
}

// 函数体内的this对象，就是定义是所在的对象，而不是使用时所在的对象。

// 不可以当做构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

// 不可以使用arguments对象，该对象在函数内不存在。如果要用，可以使用rest参数代替。

// 不可以使用yield命令，因此箭头函数不能用作Generator函数。

console.log('============================================================');

// 不适用场合

// 定义对象的方法，且该方法内部包括this

{
    const cat = {
        lives: 5,
        jumps: () => {
            this.lives--;
        }
    }
}

{
    globalThis.s = 21;
    const obj = {
        s: 42,
        m: () => console.log(this.s)
    };
    obj.m();
}

console.log('============================================================');

// 尾调用演化

{
    function f(x) {
        return g(x);
    }
}

{
    function foo() {
        let n = 1;
        let m = 2;
        return g(m + n);
    }
    function g(x) {
        console.log(x);
    }
    foo();
}

// 尾递归

{
    function foo(n, total = 1) {
        if(n === 1) {
            return total;
        }
        return n * foo(n - 1);
    }
    console.log(foo(3));
}

// Fibonacci

{
    function Fibonacci(n, ac1 = 1, ac2 = 1) {
        if(n <= 1) {
            return ac2;
        }
        return Fibonacci(n - 1, ac2, ac1 + ac2);
    }
    console.log(Fibonacci(100));
}

console.log('============================================================');

// Function.prototype.toString()

// toString()方法，明确要求返回一模一样的原始代码

{
    function foo() {
        console.log('foo');
    }
    console.log(foo.toString());
}

console.log('============================================================');

// catch命令的参数省略

// 运许catch语句省略参数

{
    try {

    } catch {

    }
}
