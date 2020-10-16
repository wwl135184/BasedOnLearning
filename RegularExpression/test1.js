// 正则表达式

{
    let reg = /^[0-9]+abc$/;
    // ^为匹配输入字符串的开始位置
    // [0-9]+匹配多个数据，[0-9]匹配单个数据，+匹配一个或单个
    let s = '123abc';
    console.log(reg.test(s));
}

{
    let reg = /^[a-z0-9_-]{3,15}$/g;
    let s = '123-abc';
    console.log(reg.test(s));
}

{
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let s = 'wwl18353209005@163.com';
    let s1 = 's1.com';
    console.log(reg.test(s));
    console.log(reg.test(s1));
}