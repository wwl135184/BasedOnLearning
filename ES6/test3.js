// 字符串的扩展

// 字符的Unicode表示法

// 采用\uxxxx形式表示一个字符，其中xxxx表示字符Unicode码点

{
    const a = '\u0061';
    console.log(a);
}

console.log('============================================================');

// 字符串的遍历器接口

// for...of

{
    for(let codePoint of 'foo') {
        console.log(codePoint);
    }
}

// for...of可以识别大于0xFFFF的码点

console.log('============================================================');

// 直接输入U+2028和U+2029

{
    console.log('中' === '\u4e2d');
}

// JavaScript规定有5个字符，不能在字符串里面直接使用，只能使用转义形式

// u005c 反斜杠
// u000D 回车
// u2028 行分隔符
// u000A 换行符

{
    const str = '\u005c';
    console.log(str);
}

console.log('============================================================');

// JSON.stringify() 的改造

// 现有的JSON.stringify()方法有可能返回不符合UTF-8标准的字符串