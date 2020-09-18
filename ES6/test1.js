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

// let 不存在变量提升 var 会发生变量提升现象