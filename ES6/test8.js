// 对象的扩展

// 属性的简洁表示法

{
    const foo = 'bar';
    const baz = {foo};
    console.log(baz);
}

// 方法简写

{
    const o = {
        method() {
            return 'hello';
        }
    }
    console.log(o.method());
}

// 简写的对象方法不能作为构造函数

console.log('============================================================');

// 属性名表达方式

// 表达式在方括号内

{
    let propKey = 'foo';
    let Obj = {
        [propKey]: true,
        ['a' + 'bc']: 123
    }
    console.log(Obj);
}

// 属性名表达式与简洁表示法，不能同时使用，会报错

{
    const foo = 'bar';
    const baz = { [foo]: 'abc' };
    console.log(baz);
}

console.log('============================================================');

// 方法的name属性

// 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性

{
    const person = {
        sayName() {
            console.log('hello world');
        }
    }
    console.log(person.sayName.name); // sayName
}

// 对象使用取值函数（getter）和存储数值（setter），则name属性不是在该方法上，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set

{
    const obj = {
        get foo() {},
        set foo(x) {}
    }
    const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
    console.log(descriptor.get.name); // get foo
    console.log(descriptor.set.name); // set foo
}

// bind方法创造函数，name属性返回bound加上原函数的名字；Function构造函数创造的函数，name属性返回anonymous

{
    console.log((new Function()).name); // anonymous
    const foo = function() {};
    console.log(foo.bind().name); // bound foo
}

// 如果对象方法是一个Symbol值，那么name属性返回的值是这个Symbol值的描述

{
    const key1 = Symbol('description');
    const key2 = Symbol();

    const obj = {
        [key1]() {},
        [key2]() {},
    }
    console.log(obj[key1].name); // [description]
    console.log(obj[key2].name); // ''
}

console.log('============================================================');

// 属性的可枚举性和遍历

// 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象

{
    let obj = { foo: 123 };
    const desc = Object.getOwnPropertyDescriptor(obj, 'foo');
    console.log(desc); // { value: 123, writable: true, enumerable: true, configurable: true }
}

// 描述对象的enumerable属性，称为可枚举性，如果该属性为false，就表示某些操作会忽略当前的属性

// 目前，有四个操作会忽略enumerate为false属性

// for...in循环：只遍历对象自身的继承的可枚举的属性。
// Object.keys()：返回对象自身的所有可枚举性的建名
// JSON.stringify()：只串行化对象自身的可枚举的属性
// Object.assign()：忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性

{
    const obj = {
        name: 1,
        value: 2
    }
    console.log(Object.keys(obj)); // ['name', 'value']
    console.log(Object.values(obj)); // [1, 2]
    console.log(Object.getOwnPropertyNames(obj)); // ['name', 'value']
    console.log(Object.getOwnPropertySymbols(obj)); // []
    console.log(Reflect.ownKeys(obj)); // ['name', 'value']
}

console.log('============================================================');

// 属性的遍历

// for...in循环遍历对象自身的和继承的可枚举属性（不含Symbol属性）。
// Object.keys(obj)返回一个数组，包含对象自身的（不含继承的）所有可枚举属性（不含Symbol属性）的键名。
// Object.getOwnPropertyNames(obj)返回一个数组，包含对象自身的所属属性（不含Symbol属性，但是包含不可枚举属性）的键名。
// Object.getOwnPropertySymbols(obj)返回一个数组，包含对自身的所有SymBol属性的键名。
// Reflect.ownKeys(obj)返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是Symbol或字符串，也不管是否可枚举。

console.log('============================================================');

// 链判断运算符

// ?.直接在链式调用判断，左侧的对象是否为null或undefined，如果是的，就不会再往下运算，而是返回undefined。

// 

{
    // const firstName = message?.body?.user?.firstName || 'default';
}

// 判断对象的方法是否存在，如果存在就立即执行

{
    // iterator.return?.();

    // if(myForm.checkValidity ?.() == false) {
    //     return;
    // }
}

// ?.运算常见形式，以及不使用该运算符的等价形式

{
    // a?.b
    // a == null ? undefined : a.b
    // a?.[x]
    // a == null ? undefined : a[x]
    // a?.b()
    // a == null ? undefined : a.b()
    // a?.()
    // a == null ? undefined : a()
}

// 使用运算符，有几个注意点

// 短路机制

// ?.运算符相当于一种短路机制，只要不满足条件，就不在往下执行
// a?.[++x]
// a == null ? undefined : a[++x]

// delete运算符
// delete a?.b
// a == null ? undefined : delete a.b
// a是undefined或null，会直接返回undefined，而不会进行delete运算

// 括号的影响
// 如果属性链有括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响
// (a?.b).c
// (a == null ? undefined : a.b).c
// 一般来说，使用?.运算符的场景，不应该使用圆括号

// 报错场合
// 以下写法是禁止的，会报错

// 构造函数
// new a?.()
// new a?.b()

// 链判断运算符的右侧有模板字符串
// a?.`{b}`
// a?.b`{c}`

// 链判断运算符的左侧是super
// super?.()
// super?.foo

// 链判断运算符用于赋值运算的左侧
// a?.b = c

// 右侧不得为十进制数值

console.log('============================================================');

// Null判断运算符

// ??与链路运算符?.配合使用，为null和undefined设置默认值

{
    // const headerText = response.settings.headerText ?? 'hello world';
    // const animationDuration = response.settings?.animationDuration ?? 300;
}

// Null运算符适合判断参数是否赋值

{
    function Component(props) {
        // const enable = props.enabled ?? true;
    }
    // 等价于
    function Component(props) {
        const { enabled: enable = true } = props;
    }
}

// ??运算优先级问题，多个运算符一起使用，必须用括号表明优先级，否则会报错。