// 对象的新增方法

// Object.is()
// Object.is()用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

{
    console.log(Object.is('foo', 'foo')); // true
    console.log(Object.is('1', 1)); // false
}

{
    console.log(Object.is(+0, -0)); // false
    console.log(+0 === -0); // true
}

{
    console.log(Object.is(NaN, NaN)); // true
    console.log(NaN === NaN); // false
}

console.log('============================================================');

// Object.assign()
// Object.assign()方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

{
    const obj0 = { a: 1 };
    const obj1 = { b: 1 };
    const obj2 = { c: 1 };
    const target = Object.assign({}, obj0, obj1, obj2);
    console.log(target); // { a: 1, b: 1, c: 1 }
}

// 如果只有一个参数，Object.assign()会直接返回该参数

{
    const Obj0 = { a: 1 };
    console.log(Object.assign(Obj0)); // { a: 1 }
}

// 如果该参数不是对象，则会先转成对象，然后返回

{
    const name = 1;
    console.log(Object.assign(name)); // [Number: 1]
}

// 由于undefined和null无法转成对象，所以如果它们作为参数，就会报错

{
    // Object.assign(undefined); // 报错
    // Object.assign(null); // 报错
}

{
    const obj = { a: 1, b: 1 };
    const target = Object.assign({}, obj, undefined);
    console.log(target); // { a: 1, b: 1 }
}

// Object.assign()拷贝的属性有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举属性（enumerable: false）

{
    const obj = Object.assign({b: 'c'}, 
        Object.defineProperty({}, 'invisible', {
            enumerable: false,
            value: 'hello'
        })
    );
    console.log(obj); // { b: 'c' }
}

// 属性名为SymBol值的属性，也会被Object.assign()拷贝

{
    const obj = Object.assign({}, { a: 'b' }, { [Symbol('c')]: 'd' });
    console.log(obj);
}

// 浅拷贝
// Object.assign()方法实行的是浅拷贝，而不是深拷贝。也就是说，如果对象某个属性的值是对象，那么目标对象拷贝的是这个对象的引用

{
    const obj0 = { a:{ b: 1} };
    const obj1 = Object.assign({}, obj0);
    obj1.a.b = 2;
    console.log(obj1); // { a:{ b: 2} }
}

// 同名属性的替换
// 对于这种嵌套的对象，一旦遇到同名属性，Object.assign()处理方法是替换，而不是添加

{
    const obj0 = { a: { b: 'name', d : 'e' } };
    const obj1 = { a: { b: 'hello world' } };
    const obj = Object.assign({}, obj0, obj1);
    console.log(obj); // { a: { b: 'hello world' } } 
}

// 数组的处理
// Object.assign()可以用来处理数组，但是会把数组视为对象

{
    const arr = Object.assign([1, 2, 3], [4, 5]);
    console.log(arr); // [4, 5, 3]
}

// 取值函数的处理
// Object.assign()只能进行值的复制，若果复制的值是一个取值函数，那么将求值后再复制

{
    const source = {
        get foo() { return 1 }
    }
    const target = {};
    const obj = Object.assign(target, source);
    console.log(obj); // { foo: 1 }
}

console.log('============================================================');

// 常见通途

// 为对象添加属性

{
    class Point {
        constructor(x, y) {
            Object.assign(this, {x, y});
        }
    }
}

// 为对象添加方法

{
    // Object.assign(SomeClass.prototype, {
    //     someMethod(arg1, arg2) {

    //     },
    //     anotherMethod() {

    //     }
    // })

    // 等同于下面写法

    // SomeClass.prototype.someMethod = function(arg1, arg2) {

    // }

    // SomeClass.prototype.antherMethod = function() {

    // }
}

// 克隆对象

{
    function clone(origin) {
        return Object.assign({}, origin);
    }
}

// 不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

{
    function clone(origin) {
        let originProto = Object.getPrototypeOf(origin);
        return Object.assign(Object.create(originProto), origin);
    }
}

// 合并多个对象

// 将多个对象合并到某个对象

{
    const merge = (target, ...souce) => Object.assign(target, ...souce);
}

// 如果希望合并后返回一个新对象，可以改写上面的函数，对一个空对象合并

{
    const merge = (...source) => Object.assign({}, ...source);
}

// 为属性指定默认值

{
    const DEFAULTS = {
        logLevel: 0,
        outputFormat: 'html'
    }
    function processContent(options) {
        options = Object.assign({}, DEFAULTS, options);
        console.log(options);
    }
    processContent({});
}

// 由于浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，不能指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用

console.log('============================================================');

// Object.getOwnPropertyDescriptors()

// ES5的Object.getOwnPropertyDescriptor()方法返回某个对象属性的描述（descriptor）。ES2017引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非集成属性）的描述对象。

{
    const obj = {
        foo: '123',
        get bar() { return 'abc' }
    }
    console.log(Object.getOwnPropertyDescriptors(obj));
}

{
    function getOwnPropertyDescriptors(obj) {
        const result = {};
        for(let key of Reflect.ownKeys(obj)) {
            result[key] = Object.getOwnPropertyDescriptor(obj, key);
        }
        return result;
    }
    const obj = {
        foo: '123',
        get bar() { return 'abc' }
    }
    console.log(getOwnPropertyDescriptors(obj));
}

// 改方法的引入目的，只要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

{
    const source = {
        set foo(value) {
            console.log(value);
        }
    }
    const target1 = {};
    Object.assign(target1, source);
    console.log(Object.getOwnPropertyDescriptor(target1, 'foo'));
}

{
    const source = {
        set foo(value) {
            console.log(value);
        }
    }
    const target2 = {};
    Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    console.log(Object.getOwnPropertyDescriptor(target2, 'foo'));
}

{
    const showllowMerge = (target, souce) => Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(souce)
    )
}

// Object.getOwnPropertyDescriptors()方法的另一个用处，是配合Object.create()方法，将对象属性克隆到一个新对象。这属于浅拷贝

{
    // const clone = Object.create(Object.getPrototypeOf(Obj), Object.getOwnPropertyDescriptors(obj));
    const shallowClone = (Obj) => Object.create(
        Object.getPrototypeOf(Obj),
        Object.getOwnPropertyDescriptors(Obj)
    )
}

// Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象

{
    // const obj = Object.create(
    //     prot,
    //     Object.getOwnPropertyDescriptors({
    //         foo: 123
    //     })
    // )
}

// Object.getOwnPropertyDescriptors()也可以实现Mixin（混入）模式。

{
    let mix = (object) => ({
        with: (...mixins) => mixins.reduce(
            (c, mixin) => Object.create(
                c, Object.getOwnPropertyDescriptors(mixin)
            ), object
        )
    })
    let a = {a: 'a'};
    let b = {b: 'b'};
    let c = {c: 'c'};
    let d = mix(c).with(a, b);
    console.log(d.a); // a
    console.log(d.b); // b
    console.log(d.c); // c
}

console.log('============================================================');

// _proto_属性，Object.setPrototypeOf()，Object.getPrototypeOf()
// JavaScript语言的对象继承是通过原型链实现的。ES6提供了更多原型对象的操作方法。

// Object.setPrototypeOf()

// Object.setPrototypeOf()方法的作用与_proto_相同，同来设置一个对象的原型对象（prototype），返回参数对象本身

{
    // 格式
    // Object.setPrototypeOf(object, prototype)

    // 用法
    const o = Object.setPrototypeOf({}, null);
}

{
    // 等同于
    function setPrototypeOf(obj, proto) {
        obj._proto_ = proto;
        return obj;
    }
}

{
    let proto = {};
    let obj = { x: 10 };
    Object.setPrototypeOf(obj, proto);

    proto.y = 20;
    proto.z = 40;

    console.log(Object.getPrototypeOf(obj));
    console.log(obj.y); // 20
    console.log(obj.z); // 40
}

// 如果第一个参数不是对象，会自动转化为对象。由于返回的还是第一个参数，所以这个操作不会产生任何的效果

{
    console.log(Object.setPrototypeOf(1, {}) === 1); // true
    console.log(Object.setPrototypeOf('foo', {}) === 'foo'); // true
    console.log(Object.setPrototypeOf(true, {}) === true); // true
}

// 由于undefined和null无法转化为对象，所以第一个参数是undefined或null，就会报错

console.log('============================================================');

// Object.getPrototypeOf()
// 该方法与Object.setPrototypeOf配套使用，用于读取一个对象的原型对象。

{
    const obj = {};
    Object.getPrototypeOf(obj);
}

{
    function Rectangle() {

    }
    const rec = new Rectangle();
    console.log(Object.getPrototypeOf(rec) === Rectangle.prototype); // true
}

// 如果参数不是对象，会自动转化为对象

{
    console.log(Object.getPrototypeOf(1)); // [Number: 0]
    console.log(Object.getPrototypeOf('foo')); // [String: '']
    console.log(Object.getPrototypeOf(true)); // [Boolean: false]
}

console.log('============================================================');

// Object.keys()、Object.values()、Object.entries()

// Object.keys()方法，返回一个数组，成员是参数对象自身的（不含继承的）所有遍历（enumerable）属性的键名

{
    const obj = { foo: 'bar', baz: 42 };
    console.log(Object.keys(obj)); // ['foo', 'baz']
}

{
    let { keys, values, entries } = Object;
    let obj = { a: 1, b: 2, c: 3 };
    for(let key of keys(obj)) {
        console.log(key); 
    }
    for(let value of values(obj)) {
        console.log(value);
    }
    for(let [key, value] of entries(obj)) {
        console.log([key, value]);
    }
}

// Object.values()

{
    const obj = { a: 1, b: 2 };
    console.log(Object.values(obj)); // [1, 2]
}

// Object.values()只会返回对象自身的可遍历属性

{
    const obj = Object.create({}, {p: { value: 2, enumerable: true }});
    console.log(Object.values(obj)); // ['2']
}

// Object.values()会过滤属性名为Symbol值的属性

{
    console.log(Object.values({ [Symbol()]: '123', foo: 'abc' })); // ['abc']
}

// 如果参数不是对象，Object.values会将起转化为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。Object.values()会返回空数组

{
    console.log(Object.values(1)); // []
    console.log(Object.values(true)); // []
}

// Object.entries()

{
    const obj = { foo: 'abc', baz: 42 };
    console.log(Object.entries(obj)); // [ [ 'foo', 'abc' ], [ 'baz', 42 ] ]
}

// 原对象的属性名是一个Symbol值，该属性会被忽略

{
    console.log(Object.entries({ [Symbol()]: 'foo', abc: 1 })); // [ [ 'abc': 1 ] ]
}

// Object.entries()的基本用途是遍历对象的属性

{
    const obj = { a: 1, b: 2, c: 3 };
    for(let [key, value] of Object.entries(obj)) {
        console.log([key, value]);
    }
}

// Object.entries()的另一个用处是，将对象转化为真正的Map结构

{
    const obj = { foo: 'bar', baz: 42 };
    const map = new Map(Object.entries(obj));
    console.log(map); // Map { 'foo' => 'bar', 'baz' => 42 }
}

// 实现Object.entries()

{
    // Generator函数的版本
    function* entries(obj) {
        for(let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }
}

{
    // 非Generator函数的版本
    function entries(obj) {
        let arr = [];
        for(let key of Object.keys(obj)) {
            arr.push([key, obj[key]]);
        }
        return arr;
    }
}

console.log('============================================================');

// Object.fromEntries()
// Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转化为对象

{
    const obj = Object.fromEntries([
        ['foo', 'bar'],
        ['baz', 42]
    ]);
    console.log(obj);
}

// 该方法的一个用处是配合URLSearchParams对象，将查询字符串转化为独享

{
    const params = Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'));
    console.log(params);
}