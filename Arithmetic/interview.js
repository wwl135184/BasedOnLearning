// 无重复最长字符串
{
    function test1(string) {
        let str = '', maxStr = '';
        for(let i = 0; i < string.length; i++) {
            let chat = string[i];
            let index = str.indexOf(chat);
            if(index === -1) {
                str += chat;
                if(str.length > maxStr.length) {
                    maxStr = str;
                }
            } else {
                str += chat;
                str = str.slice(index + 1);
            }
        }
        return maxStr;
    }
    console.log(test1('abcdefghabcdabcdabcdefgh')); // abcdefgh
}

// ES6中常用数组操作

{
    // new Set()
    // 数组去重
    let arr0 = [1, 1, 2, 3, 3, 4];
    let arr1 = [...new Set(arr0)];
    console.log(arr1); // [1, 2, 3, 4]

    // 并集
    let arr2 = new Set([1, 2, 3]);
    let arr3 = new Set([4, 3, 2]);
    let arr4 = [...new Set([...arr2, ...arr3])]; 
    console.log(arr4); // [1, 2, 3, 4]

    // 交集
    let arr5 = [...new Set([...arr2].filter(i => arr3.has(i)))];
    console.log(arr5); // [2, 3]
    
    // 差集
    let arr6 = [...new Set([...arr2].filter(i => !arr3.has(i)))];
    console.log(arr6); // [1]
}

// 原型链

// 一、原型

// 原型prototype和_proto_
// 每个对象都有一个_proto_属性，并且指向它的prototype原型对象
// 每个构造函数都有一个prototype原型对象
// prototype原型对象的constructor指向构造函数本身

// 实例对象的_proto_指定构造函数的prototype，从而实现继承

//  

{
    function Person(nick, age) {
        this.nick = nick;
        this.age = age;
    }
    Person.prototype.sayName = function() {
        console.log(this.nick);
        console.log(this.age);
    }

    let p1 = new Person('Byron', 20);
    p1.sayName();

    let p2 = new Person('Casper', 22);
    p2.sayName();

    console.log(p1.__proto__ === Person.prototype); // true
    console.log(p2.__proto__ === Person.prototype); // true
    console.log(p1.__proto__ === p2.__proto__); // true
    console.log(Person.prototype.constructor === Person); // true
    console.log(Object.getPrototypeOf(p1)); // Person { sayName: [Function] }
    console.log(Object.getPrototypeOf(Person)); // [Function]
}

// Object.create(null)没有_proto_属性

// 原型链

{
    let arr = [1, 2, 3];
    console.log(arr.valueOf()); // [1, 2, 3]
}