// Proxy
// Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种"元编程"(meta programming)，即对编程语言进行编程。

// Proxy代理器

{
    const obj = new Proxy({}, {
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
    // const proxy = new Proxy(target, handler);
}

// Proxy对象的所有用法，都是上面的形式，不同只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为

{
    const proxy = new Proxy({}, {
        get: function(target, proKey) {
            return 35;
        }
    })
    console.log(proxy); // {}
    console.log(proxy.time); // 35
    console.log(proxy.name); // 35
    console.log(proxy.title); // 35
}

// 作为构造函数，Proxy接受两个参数。第一个参数是所要代理的目标对象，即使如果没有Proxy的介入，操作原来要访问的就是这个对象；
// 第二个参数时配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作

// 要使得Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象进行操作

// 如何handler没有设置拦截，那就等同于直接通向原对象

{
    const target = {};
    const handler = {};
    const proxy = new Proxy(target, handler);
    proxy.a = 'b';
    console.log(target.a); // b
}

// handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target

// 一个技巧是将Proxy对象，设置到object.proxy属性，从而可以在object对象上调用

{
    const target = {}, handler = {};
    const object = { proxy: new Proxy(target, handler) };
}

// Proxy实例也可以作为其他对象的原型对象

{
    const proxy = new Proxy({}, {
        get: function(target, propKey) {
            return 35;
        }
    })

    let obj = Object.create(proxy);
    console.log(obj.time); // 35
}

// proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截

// 同一个拦截器，可以设置拦截多个操作

{
    const handler = {
        get: function(target, name) {
            if(name === 'prototype') {
                return Object.prototype;
            }
            return `Hello, ` + name;
        },
        apply: function(target, thisBinding, args) {
            return args[0];
        },
        construct: function(target, args) {
            return { value: args[1] };
        }
    }
    const fproxy = new Proxy(function(x, y) {
        return x + y;
    }, handler);

    console.log(fproxy(1, 2)); // 1
    console.log(new fproxy(1, 2)); // { value: 2 }
    console.log(fproxy.prototype === Object.prototype); // true
    console.log(fproxy.foo); // Hello, foo
}

console.log('============================================================');

// Proxy支持拦截的操作

// get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']

// set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值

// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值

// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值

// ownKeys(target)：拦截Object.getOwnProPertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组
// 该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性

// getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象

// defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc)、Object.defineProperties(proxy、propDescs)，返回一个布尔值

// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值

// getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象

// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值

// setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截

// apply(target, object, args)：拦截Proxy实例作为函数调用的操作，比如proxy(...agrs)、proxy.call(Object, ...args)、proxy.apply(...)

// construct(target, args)：拦截Proxy实例作为构造函数调用的操作，比如new proxy(..args)