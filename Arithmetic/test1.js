// Math函数

// abs(x) 方法可放回数的绝对值
// Math.abs(x)

{
    let num = -1;
    console.log(Math.abs(num)); // 1
}

// acos(x) 方法可返回一个数的反余弦值
// Math.acos(x)

{
    let num = 0;
    console.log(Math.acos(num));
}

// asin(x) 方法可放回一个数的反正弦值
// Math.asin(x)

{
    let num = 0;
    console.log(Math.asin(num));
}

// atan(x) 方法可返回数字的反正切值
// Math.atan(x)

{
    console.log(Math.atan(0.1));
}

// atan2(y, x) 方法可返回从x轴到点(x, y)之间的角度
// Math.atan2(y, x)

{
    console.log(Math.atan2(0.5, 0.5));
}

// ceil(x) 方法可对一个数进行上舍入
// Math.ceil(x)

{
    console.log(Math.ceil(1.68)); // 2
}

// cos(x) 方法可返回一个数字的余弦值
// Math.cos(x)

{
    console.log(Math.cos(0)); // 1
}

// exp(x) 方法可返回e的x次幂
// Math.exp(x)

{
    console.log(Math.exp(1)); // 2.718281828459045
}

// floor(x) 方法可对一个数进行下取舍
// Math.floor(x)

{
    console.log(Math.floor(1.2365)); // 1
}

// log(x) 方法可返回一个数的自然对数
// Math.log(x)

{
    console.log(Math.log(2.7183));
}

// max(x, y) 方法可返回两个指定的数中带有较大的值的那个数
// Math.max(x, y)

{
    console.log(Math.max(1, 2)); // 2
}

// min(x, y) 方法可返回指定的数中带有最低值的数字
// Math.min(x, y)

{
    console.log(Math.min(1, 2)); // 1
}

// pow(x, y) 方法可返回x的y次幂的值
// Math.pow(x, y)

{
    console.log(Math.pow(2, 2)); // 4
}

// random() 方法可返回介于0~1之间的一个随机数
// Math.random();

{
    console.log(parseFloat((Math.random()).toFixed(2))); // 0.01
}

// round(x) 方法可把一个数字舍入为最接近的整数

{
    console.log(Math.round(22.36)); // 22
}

// sin(x) 返回数的正弦
// Math.sin(x)

{
    console.log(Math.sin(0)); // 0
}

// sqrt(x) 放回一个数的平方根
// Math.sqrt(x)

{
    console.log(Math.sqrt(4)); // 2
}

// tan(x) 方法可返回一个表示某个角的正切数字
// Math.tan(x)

{
    console.log(Math.tan(0)); // 0
}

// toSource(x) 方法返回表示对象源代码的字符串
// Math.toSource(x)

{   
    function obj(name, age) {
        this.name = name;
        this.age = age;
    }
    let bill = new obj('name', 24);
    // console.log(bill.toSource());
}

// valueOf() 方法返回Math对象的原始值

{
    console.log(Math.valueOf());
}