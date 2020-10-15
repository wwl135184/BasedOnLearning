// 字符串的新增方法

// String.fromCodePoint()方法

// ES5提供String.fromCharCode()方法，用于从Unicode码点返回对应字符，不能识别码点大于0xFFFF的字符。

// ES6提供String.fromCodePoint()方法，可以识别大于0xFFFF的字符。

{
    // console.log(String.fromCodePoint(0x20BB7));

    // console.log(String.fromCodePoint(0x78, 0x1f680, 0x79)) === 'x\uD83D\uDE80y';
}

console.log('============================================================');

// String.raw()方法

// ES6还原原生字符串String对象，提供一个String.row()方法。该方法返回一个斜杠被转义（即斜杠前面再加一个斜杠）的字符串。

{
    const string = String.raw`Hi\n${2+3}!`; ·
    console.log(string);

    console.log(String.raw`Hi\\n` === 'Hi\\\\n');

    console.log(String.raw({raw: ['foo', 'bar']}, 1 + 2));

    console.log(`foo${1 + 2}bar`);
}

console.log('============================================================');

// String.codePointAt()方法

// JavaScript内部，字符以UTF-16的格式存储，每个字符固定2个字节。对于那些需要4个字节存储的字符(Unicode码点大于0xFFFF的字符)，JavaScript会认为它们是两个字符。

// String.codePoinAt()方法，能够正确处理4个人字符存储的字符，返回一个字符的码点。

{
    let s = '吉';
    console.log(s.length);
    const code0 = s.codePointAt(0);
    console.log(code0);
}

console.log('============================================================');

// 实例方法：normalize()

// ES6提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，Unicode正规化。

console.log('============================================================');

// 实例方法：includes(), startsWith(), endsWith()

// includes()：返回布尔值，表示是否查询到参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

{
    let s = 'hello world';

    console.log(s.includes('name'));
    console.log(s.startsWith('h'));
    console.log(s.endsWith('d'));

    console.log(s.startsWith('e', 1));
    console.log(s.endsWith('hello', 5));
    console.log(s.includes('world', 5));
}

console.log('============================================================');

// 实例方法：repeat()

// repeat()方法返回一个新字符串，表示将原字符串重复n次。

{
    console.log('x'.repeat(10)); // xxxxxxxxxx
}

// 参数是小数，会被取整

{
    console.log('x'.repeat(3.3)); // xxx
}

// 如果repeat的参数是负数或者Infinity，会报错。

// 0到-1之间的小数，则等同于0。

{
    console.log('y'.repeat(-0.1)); // ''
}

// 参数NaN等同于0。

// 如果repeat的参数是字符串，则先转化为数字。

{
    console.log('na'.repeat('3')); // nanana
}

console.log('============================================================');

// 实例方法：padStart(), padEnd()

// padSatrt()用于头部补全，padEnd()用于尾部补全。

{
    console.log('x'.padStart(5, 'ab')); // ababx
    console.log('x'.padEnd(4, 'ab')); // xaba
}

// 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。

{
    console.log('xxx'.padStart(2, 'ad')); // xxx
    console.log('xxx'.padEnd(2, 'ab')); // xxx
}

// 如果用来补全字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

{
    console.log('adc'.padStart(10, '0123456789')); // 0123456abc
}

// 如何省略第二个参数，默认使用空格补全长度。

{
    console.log('x'.padStart(4)); // '    x'
    console.log('x'.padEnd(4)); // 'x    '
}
 
// 补全指定位数，10位的数值字符串。

{
    console.log('1'.padStart(10, '0')); // 0000000001
}

// 提示字符串格式

{
    console.log('12'.padStart(10, 'YYYY-MM-DD')); // YYYY-MM-12
    console.log('09-12'.padStart(10, 'YYYY-MM-DD')); // YYYY-09-12
}

console.log('============================================================');

// 实例方法：trimStart(), trimEnd()

// trimStart()消除字符串的头部空格，trimEnd()消除尾部的空格。

{
    console.log('    x'.trimStart()); // x
    console.log('  x  '.trim()); // x
    console.log('x    '.trimEnd()); // x
}

console.log('============================================================');

// 实例方法：matchAll()

// matchAll方法返回一个正则表达式在当前字符串的所有匹配。