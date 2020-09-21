// 变量的解构赋值

// 数组的解构赋值

{
    let a = 1;
    let b = 2;
    let c = 3;
}

// ES6

// 模式匹配

{
    let [a, b, c] = [1, 2, 3];

    let [, , third] = ['foo', 'bar', 'baz'];
    console.log(third); // baz

    let [head, ...tail] = [1, 2, 3, 4];
    console.log(head); // 1
    console.log(tail); // [2, 3, 4]
}

// 如果解构不成功，变量的值就等于undefined

// 不完全解构

{
    let [x, y] = [1, 2, 3];
    console.log(x);

    let [a, [b], c] = [1, [2, 3], 4];
    console.log(a);
    console.log(b);
    console.log(c)
}

// 如果等号的右边不是数组，那么将会报错

{
    // let [foo] = false; // false is not iterable
    // console.log(foo); 
}

// Set结构

{
    let [x, y, z] = new Set(['a', 'b', 'z']);
    console.log(x);
}

// 某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值

{
    function* fibs() {
        let a = 0;
        let b = 1;
        while(true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    let [first, second, third, fourth, fifth, sixth] = fibs();

    console.log(sixth);
}

console.log('============================================================');

// 默认值

{
    let [foo = true] = []; 
    console.log(foo);

    let [x, y = 'b'] = ['a']; // x = 'a' y = 'b'
    let [z, a = 'b'] = ['a', undefined];
}

{
    let [x = 1] = [undefined]; // 只有当数组成员严格等于undefined，默认值才会生效
    console.log(x);

    let [y = 1] = [null]; // 如果一个数组的成员是null，默认值就不会生效，因为null不严格等于undefined
    console.log(y);
}

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用的时候，才会求值

{
    function f() {
        console.log('aaa');
        return 2;
    }

    let [x = f()] = [1];
    console.log(x);

    let [y = f()] = [undefined];
    console.log(y);
}

// 默认值可以引用解构赋值的其他变量，但变量必须已经声明

{
    let [x = 1, y = x] = [];
    console.log(x);
    console.log(y);
}

console.log('============================================================');

// 对象的解构赋值

{
    let { foo, boo} = { foo: 'aaa', boo: 'bbb' };
    console.log(foo);
    console.log(boo);

    let { baz } = { foo: 'aaa', boo: 'bbb' };
    console.log(baz); // undefined 如果解构失败，变量的值等于undefined
}

// 对象的解构内部机制，是先找到同名属性，然后在赋给对应的比变量

{
    let { foo: baz } = { foo: 'aaa', boo: 'bbbb' }; // foo是匹配模式，baz才是变量，真正被赋值的是变量baz，而不是模式foo
    console.log(baz); 
    // console.log(foo); // error: foo is not defined
} 

// 嵌套解构的解构

{
    let obj = {
        p: [
            'hello',
            { y: 'world' }
        ]
    }
    let { p: [x, { y }] } = obj;
    console.log(x);
    console.log(y);
}

{
    let obj = {
        p: [
            'hello',
            { y: 'world' }
        ]
    }
    let { p, p: [x, { y }] } = obj;
    console.log(x);
    console.log(y);
    console.log(p);
}

{
    const node = {
        loc: {
            start: {
                line: 1
            }
        }
    }

    let { loc, loc: { start }, loc: { start: { line } } } = node;
    console.log(loc);
    console.log(start);
    console.log(line);
} 

// 嵌套赋值

{
    let obj = {};
    let arr = [];

    ({ foo: obj.name, boo: arr[0] } = { foo: 'name', boo: 1 });
    
    console.log(obj);
    console.log(arr);
}

// 对象的解构赋值可以取到继承的属性

{
    const obj1 = {};
    const obj2 = { foo: 'aaa' };
    Object.setPrototypeOf(obj1, obj2);

    console.log(obj1);

    let { foo } = obj1;
    console.log(foo);
}

// 默认值

{
    let { x = 1 } = { x: 2 };
    console.log(x);

    let { message: msg = 'success' } = {};
    console.log(msg); 
}


// 默认值生效的条件是，对象的属性值严格等于undefined

{
    let { x = 1} = { x: undefined }; // 1
    let { y = 2 } = { y: null }; // null
    console.log(x);
    console.log(y); 
}

console.log('============================================================');

// 注意点

// 如果将一个以声明的变量用于解构赋值，JavaScript引擎会将{x}理解成一个代码块，从而发生语法错误。只要不将大括号写在首行，避免JavaScript将其解释为代码，才能解决这个问题
{
    let x;
    ({ x } = { x: 2 });
    console.log(x);
}

// 数组本质是特殊的对象，可以对数组进行对象属性的解构

{
    let arr = [1, 2, 3];
    let { 0: first, [arr.length - 1]: last } = arr;
    console.log(first);
    console.log(last);
}

console.log('============================================================');

// 字符串的解构赋值

{
    const [a, b, c, d, e] = 'hello';
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(e);
}

// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值

{
    let { length: len } = 'hello';

    console.log(len);
}

console.log('============================================================');

// 数值和布尔值的解构赋值

{
    let { toString: s } = 123;
    console.log(s);
    console.log(s === Number.prototype.toString);

    let { toString: m } = true;
    console.log(m);
    console.log(m === Boolean.prototype.toString);
}

// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转化为对象。由于undefined和null无法转化为对象，所以对他们进行解构，都会报错

console.log('============================================================');

// 函数参数的解构赋值

{
    function add([x, y]) {
        return x + y;
    }

    console.log(add([0, 2]));
}


{
    const arr = [[1, 3], [2, 5]];
    console.log(arr.map(([a, b]) => a + b));
}

{
    function move({x = 0, y = 0} = {}) {
        return [x, y];
    }

    console.log(move({x: 3, y: 8})); 
    console.log(move());
}

console.log('============================================================');

// undefined就会触发函数参数的默认值

{
    console.log([1, undefined, 2].map((x = 'yes') => x));
}