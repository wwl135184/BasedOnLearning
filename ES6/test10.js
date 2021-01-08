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

