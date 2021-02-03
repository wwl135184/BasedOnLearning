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

console.log('============================================================');

// Proxy实例方法

// get()
// get()方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和proxy实力本身，其中最后一个参数可选

{
    const person = {
        name: '张三'
    }
    const proxy = new Proxy(person, {
        get: function(target, propKey) {
            if(propKey in target) {
                return target[propKey];
            } else {
                throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
            }
        }
    })
    console.log(proxy.name); // 张三
    // console.log(proxy.age); // 抛出一个错误
}

// get方法可以继承

{
    let proto = new Proxy({}, {
        get(target, propertyKey, receiver) {
            console.log('GET ' + propertyKey);
            return target[propertyKey];
        }
    })

    let obj = Object.create(proto);
    obj.foo; // GET foo
}

// 上面代码中，拦截操作定义在Prototype对象上面，所以如果读取obj对象继承的属性时，拦截会失效

// 使用get拦截，实现数组读取负数的索引

{
    function createArray(...elements) {
        let handler = {
            get(target, propKey, receiver) {
                let index = Number(propKey);
                if(index < 0) {
                    propKey = String(target.length + index);
                }
                return Reflect.get(target, propKey, receiver);
            }
        }
        let target = [];
        target.push(...elements);
        return new Proxy(target, handler);
    }

    let arr = createArray('a', 'b', 'c');
    console.log(arr[-1]); // c
    console.log(arr[0]); // a
    console.log(arr[-2]); // b
    console.log(arr[-3]); // a
}

// 利用Proxy，可以将读取属性的操作(get)，转变为执行某个函数，从而实现属性的链式操作

{
    const pipe = function(value) {
        let funcStack = [];
        const oproxy = new Proxy({}, {
            get: function(pipeObject, fnName) {
                if(fnName === 'get') {
                    return funcStack.reduce((val, fn) => {
                        return fn(val);
                    }, value);
                }
                funcStack.push(window[fnName]);
                return oproxy;
            }
        });
        return oproxy;
    }
    const double = n => n * 2;
    const pow = n => n * n;
    const reverseInt = n => n.toString().split("").reverse().join("") | 0;

    // console.log(pipe(3).double.pow.reverseInt.get); // 63
}

// get拦截，实现一个生成各种DOM节点的通用函数dom

{
    const dom = new Proxy({}, {
        get(target, property) {
            return function(attrs = {}, ...children) {
                const el = document.createElement(property);
                for(let prop of Object.keys(attrs)) {
                    el.setAttribute(prop, arrts[prop]);
                }
                for(let child of children) {
                    if(typeof child === 'string') {
                        child = document.createTextNode(child);
                    }
                    el.appendChild(child);
                }
                return el;
            }
        }
    });
}

// get方法的第三个参数的例子，它总是指向原始的读操作所在的那个对象，一般情况下就是Proxy实例

{
    const proxy = new Proxy({}, {
        get: function(target, key, receiver) {
            return receiver;
        }
    });
    console.log(proxy.getRecevier === proxy); // true
}

// proxy对象的getRecevier属性是由proxy对象提供的，所以receiver指向proxy对象

{
    const proxy = new Proxy({}, {
        get: function(target, key, receiver) {
            return receiver;
        }
    });

    const d = Object.create(proxy);
    console.log(d.a === d); // true
}