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