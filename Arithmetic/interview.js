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

// 当试图访问一个对象的属性时，他不仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或达到原型链的末尾

// Object.prototype._proto_ === null，意味着查找结束

{
    let arr = [1, 2, 3];
    console.log(arr.valueOf()); // [1, 2, 3]
    console.log(arr.__proto__); // []
    console.log(Object.getPrototypeOf(arr)); // []
    console.log(arr.__proto__.__proto__.valueOf); // [Function: valueof]
    console.log(Array.prototype.__proto__.constructor); // [Function: Object]
}

// arr ---> arr._proto_ ---> arr._proto_._proto ---> null

// javeScript中的继承

// 继承是指一个对象直接使用另一个对象的属性和方法

// 得到一个对象的属性
// 得到一个对象的方法

{
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.getName = function() {
        console.log(this.name);
        console.log(this.age);
    }

    function Teacher(name, age, subject) {
        Person.call(this, name, age);
        this.subject = subject;
    }

    Teacher.prototype = Object.create(Person.prototype);
    Teacher.prototype.constructor = Teacher;

    let teacher = new Teacher('jack', 22, Math);
    console.log(teacher.name); // jack
    console.log(teacher.age); // 22
    teacher.getName(); // jack 22
}

// hasOwnProperty

// hasOwnProperty是JavaScript中唯一处理属性的且不会遍历原型链的方法。

// 原型

// 每个对象都有一个_proto_属性，并且指向它的prototype原型对象
// 每个构造函数都有一个prototype原型对象
// prototype原型对象里的constructor指向构造函数本身

// 原型链

// 每一个对象都有一个_proto_，它指向它的prototype原型对象，而prototype原型对象又具有一个自己的prototype原型对象，这样层层往上直到一个对象的原型prototype为null
// 这个查询的路径就是原型链

// JavaScript中的继承

// 继承就是指一个对象直接使用另一个对象的属性和方法

console.log('============================================================');

// Vue生命周期

// beforeCreate 实例完全被创建出来之前，vue实例的挂在元素$el与data数据对象都为undefined，还未初始化 
// created 数据对象data已存在，可以调用methods中的方法，操作data中的数据，但dom未生成，$el未存在
// beforeMount、mounted
// beforeUpdate、updated
// beforeDestroy、destroyed

console.log('============================================================');


// 闭包

{
    
}