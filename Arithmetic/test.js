// 冒泡排序

{
  function bubbleSort(arr, fn) {
    let length = arr.length;
    while (length--) {
      for (let i = 0; i < length; i++) {
        if (fn) {
          if (fn(arr[i], arr[i + 1]) > 0) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          }
        } else {
          if (arr[i] - arr[i + 1] > 0) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          }
        }
      }
    }
    return arr;
  }

  const arr = [2, 4, 1, 0, 7, 8];

  console.log(bubbleSort(arr, (a, b) => b - a)); // 倒序
}

// 数字翻转

{
  function digitalFlip(num) {
    let arr = parseInt(Math.abs(num).toString().split("").reverse().join("")); // Math.abs() 返回一个数的绝对值 reverse() 颠倒数组中元素的顺序
    if (arr.toString(2).length >= 32) {
      // toString(2) 以二进制值显示
      arr = 0;
    }
    return arr > 0 ? arr : -arr;
  }

  const num = 123;

  console.log(digitalFlip(num));
}

// 无重复最长字符串

{
  function noRepeatStringLength(string) {
    let maxStr = "";
    let str = "";
    for (let i = 0; i < string.length; i++) {
      let chat = string[i];
      let index = str.indexOf(chat); // indexOf(searchvalue, fromindex) 方法返回某个指定字符串在字符串中首次出现的位置，检索的字符串没有出现，则该方法返回-1
      if (index === -1) {
        str += chat;
        if (str.length > maxStr.length) {
          maxStr = str;
        }
      } else {
        str += chat;
        str = str.slice(index + 1); // slice(start, end) 已有数组中返回选定的元素
      }
    }
    return maxStr;
  }

  const string = "abckabcdeffabc";

  console.log(noRepeatStringLength(string));
}

// 栈的实现

{
  function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
  }

  function push(element) {
    this.dataStore[this.top++] = element;
  }

  function pop() {
    return this.dataStore[--this.top];
  }

  function peek() {
    return this.dataStore[this.top - 1];
  }

  function length() {
    return this.top;
  }

  function clear() {
    this.top = 0;
  }

  let s = new Stack();
  s.push("David");
  console.log(s.length());
  s.push("Raymond");
  s.push("Bryan");
  console.log(s.dataStore);
  console.log(s.length());
  // console.log(s.pop());
  // s.clear();
  console.log(s.dataStore);
  console.log(s.peek());

  // 进制转化
  function mulBase(num, base) {
    let s = new Stack();
    do {
      s.push(num % base);
      num = Math.floor((num /= base)); // Math.floor() 返回最大整数
    } while (num > 0);
    {
      var converted = "";
      while (s.length() > 0) {
        converted += s.pop();
      }
    }
    return converted;
  }
  console.log(mulBase(17, 2));

  // 判断是否为回文
  function isPalindrome(word) {
    let s = new Stack();
    for (var i = 0; i < word.length; i++) {
      s.push(word[i]);
    }
    let rword = "";
    while (s.length() > 0) {
      rword += s.pop();
    }
    if (word == rword) {
      return true;
    } else {
      return false;
    }
  }

  console.log(isPalindrome("dad"));

  // 递归
  function factorial(n) {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }

  console.log(factorial(6));
}

// num++与++num的区别
{
  let a = 0,
    d = 0;
  const b = a++; // 先赋值，再加1
  const c = ++d; // 先加1，再赋值
  console.log(b);
  console.log(c);
}

// 数组对象去重

{
  let objArr = [
    { id: 0, name: 0 },
    { id: 1, name: 1 },
    { id: 0, name: 0 },
  ];
  // 双层for循环
  function fn1(tempArr) {
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = i + 1; j < tempArr.length; j++) {
        if (tempArr[i].id === tempArr[j].id) {
          tempArr.splice(j, 1);
          j--;
        }
      }
    }
    return tempArr;
  }
  console.log(fn1(objArr));
  // indexOf()
  function fn2(tempArr) {
    let newArr = [];
    for (let i = 0; i < tempArr.length; i++) {
      if (newArr.indexOf(tempArr[i].id) === -1) {
        newArr.push(tempArr[i].id);
      } else {
        tempArr.slice(i, 1);
      }
    }
    return tempArr;
  }
  console.log(fn2(objArr));
  // 对象访问属性的方法
  function fn3(tempArr) {
    let result = [];
    let obj = {};
    for (let i = 0; i < tempArr.length; i++) {
      if (!obj[tempArr[i].id]) {
        result.push(tempArr[i]);
        obj[tempArr[i].id] = true;
      }
    }
    return result;
  }
  console.log(fn3(objArr));
  // Map()
  {
    const map = new Map();
    for (let item of objArr) {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    }
    const arr = [...map.values()];
    console.log(arr);
  }
  {
    const map = new Map();
    const newArr = objArr.filter((v) => !map.has(v.id) && map.set(v.id, 1));
    console.log(newArr);
  }
}
