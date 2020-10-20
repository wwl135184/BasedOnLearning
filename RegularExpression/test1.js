// 正则表达式

{
    let reg = /^[0-9]+abc$/;
    // ^为匹配输入字符串的开始位置
    // [0-9]+匹配多个数据，[0-9]匹配单个数据，+匹配一个或单个
    let s = '123abc';
    console.log(reg.test(s)); // true
}

{
    let reg = /^[a-z0-9_-]{3,15}$/;
    let s = '123-abc';
    console.log(reg.test(s)); // true
}

{
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let s = 'wwl18353209005@163.com';
    let s1 = '123@123.com.com';
    console.log(reg.test(s)); // true
    console.log(reg.test(s1)); // false
}

console.log('============================================================');

{
    // + 代表前面的字符必须出现一次（1次或多次）。
    let reg = /runo+b/;
    const s = 'runb';
    console.log(reg.test(s)); // false

    // * 代表前面的字符可以不出现，也可以出现一次或者多次（0次，或1次，或多次）
    let reg1 = /runo*b/;
    const s1 = 'runb';
    console.log(reg1.test(s1)); // true

    // ? 代表前面的字符最多只可以出现一次（0次、或1次）
    let reg2 = /colou?r/;
    const s2 = 'colouur';
    console.log(reg2.test(s2)); // false
}

console.log('============================================================');

{
    // 普通字符
    
    // [ABC] 匹配[...]中所有的字符

    let reg = /[aeiou]/g;
    const s = 'google runoob taobao';
    console.log(reg.test(s)); // true

    // [^ABC] 匹配除了[...]中所有的字符

    let reg1 = /[^aeiou]/g;
    console.log(reg1.test(s)); // true

    // [A-Z] 表示一个区间，匹配所有的大写字母，[a-z]匹配所有的小写字母

    let reg2 = /[A-Z]/g;
    console.log(reg2.test(s)); // false

    // \s\S 匹配所有。\s匹配所有空白字符，包括换行，\S非空白字符，包括换行

    let reg3 = /\s/g;
    console.log(reg3.test(s)); // true

    // \w 匹配字母、数字、下划线。等价于[A-Za-z0-9_]

    let reg4 = /\w/g;
    console.log(reg4.test(s)); // true
}

console.log('============================================================');

{
    // 非打印字符

    // \cx 匹配由x指明的控制字符，\cM匹配一个Control-M或回车符，x的值必须为A-Z或a-z之一。否则，将c视为一个原义的'c'字符

    // \f 匹配一个换页符。等价于\x0c和\cL

    // \n 匹配一个换行符，等价于\x0a和\cJ

    // \s 匹配任何空白字符串，包括空格、制表符、换页符等等。等价于[\f\n\t\v]

    // \S 匹配任何非空白字符。等价于[^\f\n\r\t\v]

    // \t 匹配一个制表符。等价于\x09和\cl

    // \v 匹配一个垂直制表符。等价于\xOb和\cK
}

console.log('============================================================');

{
    // 特殊字符

    // $ 匹配输入字符串的结尾位置。如何设置了RegExp对象的Multiline属性，则$匹配'\n'或'\r'。要匹配$字符本身，请使用\$    

    // () 标记一个子表达式的开始和结束的位置。子表达式可以获取供以后使用。要匹配这些字符，请使用\(和\)

    // * 匹配前面的子表达式零次或者多次。要匹配*字符，请使用\*

    // + 匹配前面的字符串一次或者多次。要匹配+字符，请使用\+

    // . 匹配出换行符\n之外的任何单字符。要匹配.，请使用\.

    // [ 标记一个中括号表达式的开始。要匹配[，请使用\[

    // ? 匹配前面的子表达式零次或一次，或指明一个非贪婪限定附。要匹配?字符，请使用\?

    // \ 将下一个字符标记或特殊字符、或原义字符、或后引用、或八进制转义符。例如，'n'匹配字符'n'。'\n'匹配换行符。序列'\\'匹配"\"，而'\('则匹配"c"

    // ^ 匹配输入字符串的开始位置，除非在方括号表达式中使用，当符号在方括号表达式中使用时，表示不接受该方括号表达式中的字符集合。要匹配^字符本身，请使用\^

    // { 标记限定表达式的开始。要匹配{，请使用\{

    // } 指明两项之间的一个选择。要匹配|，请使用\|
}

{
    // 限定符

    // * 匹配前面的子表达式0次或多次。例如，zo*能匹配"z"以及"zoo"，*等价于{0,}
    // + 匹配前面的字表达式一次或多次。例如，zo+能匹配"zo"以及"zoo"，但不能匹配"z"，+等价于{1,}
    // ? 匹配前面的子表达式零次或一次。

    let reg = /do(es)?/g;
    const s = 'es'; 
    console.log(reg.test(s)); // false

    // {n} n是一个非负整数，匹配确定n次。

    const reg1 = /o{2}/;
    const s1 = 'bod';
    const s2 = 'food';
    console.log(reg1.test(s1)); // false
    console.log(reg1.test(s2)); // true

    // {n,} n是一个非负整数，至少匹配n次。{1,}等价于+。{0,}等价于*

    const reg2 = /o{1,}/; // /o+/
    console.log(reg2.test(s1)); // true
    
    // {n, m} m和n均为负整数，其中n<=m，最少匹配n次且最多匹配m次。o{0,1}等价于o?

    const reg3 = /o{0,1}/;
    console.log(reg3.test(s1)); // true

    const reg4 = /o{1, 4}/;
    console.log(reg4.test(s1)); // false

    const s3 = 'fooood';
    console.log(reg3.test(s3)); // true
}

console.log('============================================================');

{
    const reg = /a+b/;
    const s = 'b';
    console.log(reg.test(s)); // false

    const reg1 = /[1-9][0-9]?/;
    const s1 = '11';
    console.log(reg1.test(s1)); // true
}

console.log('============================================================');

{
    // 定位符

    // ^ 匹配输入字符的开始位置
    // $ 匹配输入字符串结尾的位置
    // \b 匹配一个单词边界，即字与空格间的位置
    // \B 非单词边界匹配
}

{
    // 选择

    // 用()将所有的选项括起来，相邻的选项之间用|分隔
    // ()表示捕获分组，()会把每个分组的匹配值保存起来，多个匹配值可以通过数字n来查看

    const reg = /(?:[0-9])([a-z]+)/g;
    const s = 'runoob123456runoob123456runoob';
    console.log(s.match(reg)[0]);

    // 使用圆括号会有一副作用，使相关的匹配会被缓存，此时可用?:放在第一个选项前来消除这种副作用
    // 其中?:是非捕获元之一，还有两个非捕获元是?=和?!，这两个还有更多含义，前者为正向预查，在任何开始匹配括号内的正则表达式模式的位置来匹配搜索字符串，
    // 后者为负向预查，在任何开始不匹配该正则表达式的位置来匹配搜索字符串

    // ?= ?<= ?! ?<!

    const reg1 = /runoob(?=[\d+])/g; // 匹配数字前面的runoob字符串
    console.log(s.match(reg1)); // ['runoob', 'runoob'] 

    const reg2 = /(?<=[0-9]+)runoob/g; // 匹配数字后面的runoob字符串
    console.log(s.match(reg2)); // ['runoob', 'runoob]

    const reg3 = /runoob(?![0-9]+)/g; // 匹配runoob，但后面不是数字
    console.log(s.match(reg3)); // ['runoob']

    const reg4 = /(?<![0-9]+)runoob/g; // 匹配前面不是数字的runoob
    console.log(s.match(reg4)); // ['runoob']
}

{
    // 反向引用

    const reg = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/;
    const s = 'http://www.runoob.com:80/html/html-tutorial.html';
    const arr = s.match(reg);

    arr.forEach(item => {
        console.log(item);
    })
}