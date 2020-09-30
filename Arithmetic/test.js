// 冒泡排序

{
    function bubbleSort(arr, fn) {
        let length = arr.length;
        while(length--) {
            for(let i = 0; i < length; i++) {
                if(fn) {
                    if(fn(arr[i], arr[i + 1]) > 0) {
                        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    }
                } else {
                    if(arr[i] - arr[i + 1] > 0) {
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
        let arr = parseInt(Math.abs(num).toString().split('').reverse().join('')); // Math.abs() 返回一个数的绝对值 reverse() 颠倒数组中元素的顺序
        if(arr.toString(2).length >= 32) { // toString(2) 以二进制值显示
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
        let maxStr = '';
        let str = '';
        for(let i = 0; i < string.length; i++) {
            let chat = string[i];
            let index = str.indexOf(chat); // indexOf(searchvalue, fromindex) 方法返回某个指定字符串在字符串中首次出现的位置，检索的字符串没有出现，则该方法返回-1
            if(index === -1) {
                str += chat;
                if(str.length > maxStr.length) {
                    maxStr = str;
                }
            } else {
                str += chat;
                str = str.slice(index + 1); // slice(start, end) 已有数组中返回选定的元素 
            }
        }
        return maxStr;
    }

    const string = 'abckabcdeffabc';

    console.log(noRepeatStringLength(string));
}
