// Symbol

// ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型：
// undefined、null、Boolean、String、Number、Object、Symbol

{
    let s = Symbol();
    console.log(typeof s); // symbol
}

// 注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始数据类型的值，不是对象、也就是说，由于Symbol值不是对象，所以不能添加属性。

// Symbol函数可以接受一个字符串作为参数，表示Symbol实例的描述，主要是为了在控制台显示，或者转化为字符串时，比较容易区分

{
    let s1 = Symbol('foo');
    let s2 = Symbol('bar');

    console.log(s1); // Symbol(foo)
    console.log(s2); // Symbol(bar)

    console.log(s1.toString()); // Symbol(foo)
    console.log(s2.toString()); // Symbol(bar)
}

// Symbol函数参数只是表示当前Symbol值的描述，因此相同参数的Symbol函数的返回值是不相等的

{
    let s1 = Symbol();
    let s2 = Symbol();

    console.log(s1 === s2); // fasle

    let s3 = Symbol('foo');
    let s4 = Symbol('baz');
    
    console.log(s3 === s4); // false
}

// Symbol值不能与其他类型的值进行运算，会报错

{
    let sym = Symbol('My School');
    // const str = 'your symbol is' + sym; // Cannot convert a Symbol value to a string
    // console.log(str);
}

// Symbol可以转化为字符串

{
    let s = Symbol();
    console.log(String(s)); // Symbol()
    console.log(s.toString()); // Symbol()
}

// Symbol值也可以转化为布尔值，但是不能转化为数值

{
    let sym = Symbol();
    console.log(Boolean(sym)); // true
    // console.log(Number(sym)); 
}

console.log('============================================================');

// Symbol.prototype.description

// 创建Symbol的时候，可以添加一个描述

{
    const sym = Symbol('foo');
    // console.log(sym.description());
    String(sym);
    sym.toString();
}

console.log('============================================================');

// 作为属性名的Symbol

{
    let mySymbol = Symbol();
    let a = {};
    a[mySymbol] = 'hello!';
    console.log(a); // { [Symbol()]: 'hello!' }

    let b = {
        [mySymbol]: 'hello!'
    }
    console.log(b); // { [Symbol()]: 'hello!' }

    let c = {};
    Object.defineProperty(c, mySymbol, { value: 'hello!' });
    console.log(c);
}

// Symbol值作为对象属性名时，不能用点运算符

{
    const mySymbol = Symbol();
    let a = {};
    a.mySymbol = 'hello!';
    console.log(a[mySymbol]); // undefined
    console.log(a['mySymbol']); // hello!
}

// 在对象的内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中

{
    let s = Symbol();
    let obj = {
        [s]: function(arg) {
            console.log(arg);
        }
    }
    obj[s](123);
}

// 采用增强的对象写法

{
    let s = Symbol();
    let obj = {
        [s](arg) {
            console.log(arg);
        }
    }
    obj[s](123);
}

// Symbol类型还可以用于定义一组常量，保证这组常量的值都是不想等的

{
    const log = {};
    log.levels = {
        DEBUG: Symbol('debug'),
        INFO: Symbol('info'),
        WARN: Symbol('warn')
    }
    console.log(log.levels.DEBUG, 'debug message');
    console.log(log.levels.INFO, 'info message');
}

// 常量使用Symbol值最大的好处，就是其他任何值不可能有相同的值，因此可以保证上面的switch语句会按设计的方式工作。

{
    const COLOR_RED = Symbol('red');
    const COLOR_GREEN = Symbol('green');

    function getComplement(color) {
        switch(color) {
            case COLOR_RED:
                return COLOR_GREEN;
            case COLOR_GREEN:
                return COLOR_RED;
            default:
                throw new Error('Undefined color');
        }
    }

    console.log(getComplement(COLOR_GREEN));
    console.log(getComplement(COLOR_RED));
}

console.log('============================================================');

// 实例：消除魔术字符串

{
    const shareType = {
        triangle: Symbol()
    }
    
    function getArea(shape, options) {
        let area = 0;
        switch(shape) {
            case shareType.triangle:
                area = .5 * options.width * options.height;
                break;
        }
        return area;
    }
    console.log(getArea(shareType.triangle, { width: 100, height: 100}));
}

console.log('============================================================');

// 属性名的遍历
// Symbol作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
// 不是私有属性，有一个Object.getOwnPropertySymbols()方法，可以获取指定对象的所有Symbol值。该方法返回一个数组，成员是当前对象的所有作用属性名的Symbol值

{
    const obj = {};
    let a = Symbol('a');
    let b = Symbol('b');
    obj[a] = 'Hello'; 
    obj[b] = 'World';

    const objectSymbols = Object.getOwnPropertySymbols(obj);
    console.log(objectSymbols); // [ Symbol(a), Symbol(b) ]
    console.log(obj[a]); // Hello
    console.log(obj[b]); // World
}

// Object.getOwnPropertySymbols()方法与for...in循环、Object.getOwnPropertyNames()方法进行对比的例子

{
    const obj = {};
    const foo = Symbol('foo');
    obj[foo] = 'bar';

    for(let i in obj) {
        console.log(i); // 无输出
    }

    console.log(Object.getOwnPropertyNames(obj)); // []
    console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(foo) ]
}

// for...in循环和Object.getOwnPropertyNames()方法得不到Symbol键名，需要使用Object.getOwnPropertySymbols()方法。

// 另一个新的API，Reflect.ownKeys()方法可以返回所有类型的键名，包含常规键名和Symbol键名。

{
    let obj = {
        [Symbol('my_key')]: 1,
        enum: 2,
        nonEnum: 3
    }
    console.log(Reflect.ownKeys(obj));
}

// 非私有的内部方法

{
    let size = Symbol('size');

    class Collection {
        constructor() {
            this[size] = 0;
        }
        add(item) {
            this[this[size]] = item;
            this[size]++;
        }
        static sizeOf(instance) {
            return instance[size];
        }
    }

    let x = new Collection();
    console.log(Collection.sizeOf(x)); // 0
    x.add('foo');
    console.log(Collection.sizeOf(x));  // 1

    console.log(Object.keys(x)); // [ '0' ]
    console.log(Object.getOwnPropertyNames(x)); // [ '0' ]
    console.log(Object.getOwnPropertySymbols(x)); // [ Symbol(size) ]
}

// 对象x的size属性是一个symbol值，所以Object.keys(x)、Object.getOwnPropertyNames()都无法获取它，它就造成一种非私有的内部方法的效果

console.log('============================================================');

// Symbol.for()，Symbol.keyFor()

// 使用同一个Symbol值，Symbol.for()方法可以做到这一点，它接受一个字符串作为参数，搜索有没有一该参数作为名称的Symbol值。如果有，就返回Symbol值，否则就新建一个以该字符串为名称的Symbol值

{
    let s1 = Symbol.for('foo');
    let s2 = Symbol.for('foo');
    console.log(s1 === s2); // true
}

// Symbol.keyFor()方法返回一个已登记的Symbol类型值的key

{
    let s1 = Symbol.for('foo');
    console.log(Symbol.keyFor(s1)); // foo

    let s2 = Symbol('foo');
    console.log(Symbol.keyFor(s2)); // undefined
}

// Symbol.for()为Symbol值等级名字，是全局环境的，不管有没有在全局环境运行

{
    function foo() {
        return Symbol.for('foo');
    }
    const x = foo();
    const y = Symbol.for('foo');
    console.log(x === y); // true
}

console.log('============================================================');

// 模块的Singleton模式
// Singleton模式指的是调用一个类，任何时候返回的都是用一个实例

{
    function A() {
        this.foo = 'hello';
    }

    if(!global._foo) {
        global._foo = new A();
    }
}

{
    const FOO_KEY = Symbol.for('foo');
    function A() {
        this.foo = 'hello';
    }
    // if(!gloabal[FOO_KEY]) {
        // gdlobal[FOO_KEY] = new A();
    // }
    // module.exports = gloabal[FOO_KEY];
    // gloabal[Symbol.for('foo')] = { fool: 'world' };
}

console.log('============================================================');

// 内置的Symbol值
// ES6提供了11个内置的Symbol值，指向语言内部使用的方法

// Symbol.hasInstance
// 对象的Symbol.hasInstance属性，指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。比如，foo instanceof FOO在语言内部，实际调用的是Foo[Symbol.hasInstance](f00)

{
    class MyClass {
        [Symbol.hasInstance ](foo) {
            return foo instanceof Array;
        }
    }

    console.log([1, 2, 3] instanceof new MyClass()); // true
}

{
    class Even {
        static [Symbol.hasInstance](obj) {
           return Number(obj) % 2 === 0;
        }
    }

    const Even1 = {
        [Symbol.hasInstance](obj) {
            return Number(obj) % 2 === 0;
        }
    }

    console.log(1 instanceof Even); // false
    console.log(2 instanceof Even); // true
    console.log(123456 instanceof Even1); // true
}

console.log('============================================================');

// Symbol.isConcatSpreadable

// 对象的Symbol.isConcatSpreable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开

{
    let arr1 = ['c', 'd'];
    ['a', 'b'].concat(arr1, 'e'); // [ 'a', 'b', 'c', 'd', 'e' ]
    console.log(arr1[Symbol.isConcatSpreadable]); // undefined

    let arr2 = ['c', 'd'];
    arr2[Symbol.isConcatSpreadable] = true;
    const arr3 = ['a', 'b'].concat(arr2, 'e'); 
    console.log(arr3); // ['a', 'b', 'c', 'd', 'e']
}

// Symbol.isContactSperable属性可定义在类里面

{
    class A1 extends Array {
        constructor(args) {
            super(args);
            this[Symbol.isConcatSpreadable] = true;
        }
    }
    class A2 extends Array {
        constructor(args) {
            super(args);
        }
        get [Symbol.isConcatSpreadable]() {
            return true;
        }
    }
    let a1 = new A1();
    a1[0] = 3;
    a1[1] = 4;
    let a2 = new A2();
    a2[0] = 5;
    a2[1] = 6;
    const arr = [1, 2].concat(a1).concat(a2);
    console.log(arr); // [1, 2, 3, 4, 5, 6]
}

// Symbol.isConcatSperadable的位置差异，A1是定义在实例上，A2是定义在类本身，效果相同

console.log('============================================================');

// Symbol.species

// 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性。

{
    class MyArray extends Array {
        
    }
    const a = new MyArray(1, 2, 3);
    const b = a.map(x => x);
    const c = a.filter(x => x > 1);

    console.log(b instanceof MyArray); // true
    console.log(c instanceof MyArray); // true
}

// 设置Symbol.species属性

{
    class MyArray extends Array {
        static get[Symbol.species]() { return Array; }
    }
    const a = new MyArray();
    const b = a.map(x => x);

    console.log(b instanceof MyArray); // false
    console.log(b instanceof Array); // true
}

// a.map(x => x)生成的衍生对象，就不是MyArray的实例，而直接就是Array的实例

{
    class T1 extends Promise {

    }

    class T2 extends Promise {
        static get [Symbol.species]() {
            return Promise;
        }
    }

    console.log(new T1(r => r()).then(v => v) instanceof T1); // true
    console.log(new T2(r => r()).then(v => v) instanceof T2); // false
    console.log(new T2(r => r()).then(v => v) instanceof Promise); // true
}

// T2定义了Symbol.species属性，T1没有。T1调用的是自身的构造方法，而T2调用的是Promise的构造方法

// Symbol.species的作用在于，实例对象在运行的过程中，需要再次强调自身的构造函数时，会调用该属性指定的构造函数

{
    
}
