// 正则表达式-修饰符

{
    // 常用修饰符

    // i 将匹配项设置为不区分大小写，搜索时不区分大小写：A和a没有区别
    // g global-全局匹配
    // m multi line-多行匹配 使用边界字符^和$匹配每一行的开头和结尾，多行，而不是整个字符串的开头和结尾
    // s 特殊字符圆点.中包含换行符\n，默认情况下的圆点.是匹配除了换行符\n之外的任何字符，加上s修饰符之后.中包含换行符\n

    // g

    const reg = /runoob/g;
    const s = 'Google runoob taobao runoob';
    console.log(s.match(reg));

    // i 
    const reg1 = /runoob/gi;
    const s1 = 'Google RUNOOB taobao runoob';
    console.log(s1.match(reg1));

    // m
    const reg2 = /runoob/gm;
    const s2 = 'Google\nrunoob\ntaobao\nrunoob';
    console.log(s2.match(reg2));

    // s
    const reg3 = /runoob./s;
    const s3 = 'Google\nrunoob\ntaobao';
    console.log(reg3.test(s3));
}

// 正则表达式-元字符

{
    // \d 匹配一个数字字符。等价于[0-9]
    // \D 匹配一个非数字字符。等价于[^0-9]
    // \w 匹配字母、数字、下划线。等价于[A-Za-z0-9_]
    // \W 匹配非字母、数字、下划线。等价于[^A-Za-z0-9]
    // \s 匹配任何非空白字符。等价于[^\f\r\n\t\v]
}