// Set和Map数据结构

// Set

// ES6提供了新的数据结构Set。它类似于数组，但是成员的值是唯一的，没有重复的值
// Set本身是一个构造函数，用来生成Set数据结构

{
    const s = new Set();
    [1, 2, 2, 2, 3, 4, 5].forEach(x => s.add(x));
    for(let i of s) {
        console.log(i);
    }
}

// Set函数可以接受一个数组（或者具有iterable接口的其他数据结构）作为参数，用来初始化

{
    const set = new Set([1, 2, 2, 3, 4, 5]);
    console.log([...set]); // [1, 2, 3, 4, 5]
}

{
    const items = new Set([1, 2, 3, 4, 5, 5, 5, 5, 4]);
    console.log(items.size); // 5
}

{
    // const set = new Set(document.querySelector('div'));
    // console.log(set.size); // 56
}

// 去除重复数组

{
    console.log([...new Set([1, 2, 3, 4, 5, 5, 5, 5])]); // [1, 2, 3, 4, 5]
}

// 去除字符串里面的重复字符

{
    console.log([...new Set('abbbcddd')].join('-')); // a-b-c-d
}

// 向Set加入值的时候，不会发生类型的转换，所以5和'5'是两个不同的值。Set内部判断两个值是否不同，类似于精确相等运算符（===），主要的区别是向Set加入值是认为NaN等于自身，而精确相等运算符认为NaN不等于自身

{
    console.log(NaN === NaN); // false
    console.log([...new Set([NaN, NaN, 1, 2, 3, 4, '4'])]); // [NaN, 1, 2, 3, 4, '4']
}

// 两个对象总是不相等的

{
    let set = new Set();
    set.add({});
    console.log(set.size); // 1
    set.add({});
    console.log(set.size); // 2
}

console.log('============================================================');

// Set实例的属性和方法

// Set结构的实例有以下属性

// Set.prototype.constructor：构造函数，默认就是Set函数
// Set.prototype.size：返回Set实例的成员总数
// Set.prototype.add(value)：添加某个值，返回Set结构本身
// Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示是否删除成功
// Set.prototype.has(value)：放回一个布尔值，表示该值是否为Set的成员
// Set.prototype.clear()：清除所有成员，没有返回值

{
    const s = new Set();
    s.add(1).add(2).add(2);
    console.log(s.size); // 2
    console.log(s.has(1)); // true
    console.log(s.has(3)); // false
    console.log(s.delete(1)); // true
    console.log(s.delete(3)); // false
}

// 下面是一个对比，看看在判断是否包含一个键上面，Object结构和Set结构的写法不同

{
    // 对象的写法
    
}