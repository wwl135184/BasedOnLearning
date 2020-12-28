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