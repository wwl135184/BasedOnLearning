// Proxy
// Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种"元编程"(meta programming)，即对编程语言进行编程。

// Proxy代理器

{
    let obj = new Proxy({}, {
        get: function(target, propKey, receiver) {
            console.log(`getting ${propKey}!`);
            return Reflect.get(target, propKey, receiver);
        },
        set: function(target, propKey, value, receiver) {
            console.log(`setting ${propKey}!`);
            return Reflect.set(target, propKey, value, receiver);
        }
    })
    obj.count = 1;
    console.log(++obj.count);
}

// Proxy实际上重载(overload)了点运算符，即用自己的定义覆盖了语言的原始定义

{
    let proxy = new Proxy(target, handler);
}

// Proxy对象的所有用法，都是上面的形式，不同只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为

{
    
}