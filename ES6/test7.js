// 数组的扩展

{
    // copyWithin()
    let arr0 = [1, 2, 4, 5, 6, 7, 8];
    const arr1 = arr0.copyWithin(1, 3, 7);
    console.log(arr1); // [1, 5, 6, 7, 8, 7, 8]
}

{
    // find()、findIndex()
    const arr0 = [1, 2, 3, 4, 5];
    const item = arr0.find(item => {
        return item == 6;
    })
    const index = arr0.findIndex(item => {
        return item == 5;
    })
    console.log(item); // undefined
    console.log(index); // 4
}

{
    // fill() 数组填充
    let arr0 = ['a', 'b', 'c'];
    arr0.fill(7, 1, 2);
    console.log(arr0); // [a, 7, c];
}

{
    // entries()、keys()、values()
    let arr0 = [{ value: 'a' }, { value: 'b' }, { value: 'c' }];
    for(let index of arr0.keys()) {
        console.log(index); // 0, 1, 2
    }
}

{
    // includes
    const arr0 = [0, 1, 2];
    console.log(arr0.includes(3)); // false
    const a = [NaN];
    console.log(a.includes(NaN)); // true
    console.log(a.indexOf(NaN)); // -1
}

{
    // flat(), flatMap()
    let arr0 = [1, 2, [3, 4]];
    console.log(arr0.flat()); // [1, 2, 3, 4]
    let arr1 = [1, 2, [3, [2, 3], 4]];
    console.log(arr1.flat(3)); // [1, 2, 3, 2, 3, 4]

    // Infinity 无论嵌套多少层，都要转化为1维数组
    console.log(arr1.flat(Infinity)); // [1, 2, 3, 2, 3, 4]
    
    // flat()会跳过空位
    let arr2 = [1, 2 , , 3];
    console.log(arr2.flat()); // [1, 2, 3]

    // flatMap()
    let arr3 = [1, 2, 3];
    console.log(arr3.flatMap(x => [[x, x + 3, x * 2]]));

}