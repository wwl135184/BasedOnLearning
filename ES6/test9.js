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