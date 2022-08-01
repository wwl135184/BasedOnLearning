<template>
  <div class="p-[16px]"></div>
</template>

<script lang="ts" setup>
import { StringNullableChain } from "lodash";
import { ref } from "vue";
import { stringifyQuery } from "vue-router";

// 接口
interface LabelledValue {
  label: string;
}
const printLabel = (LabelledObj: LabelledValue) => {
  console.log(LabelledObj.label);
};
const myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 可选属性
// 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
interface SquareConfig {
  color?: string;
  width?: number;
}

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1 = { x: 20, y: 20 } as Point;
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// 判断该用readonly还是const的方法是看要把它做为变量使用还是作为一个属性。做为变量使用的话用const，若作为属性则使用readonly

// 额外的属性检查
// 绕开类型检查，最简单的方法是类型断言
interface SquareConfig {
  color?: string;
  width?: number;
}
const createSquare = (config: SquareConfig) => {
  console.log(config.width);
};
createSquare(<SquareConfig>{ colour: "red", width: 10 });

// 最佳方法是添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些作为特殊用途使用的额外属性。
interface SquareConfigSecond {
  color?: string;
  width?: number;
  [propName: string]: any;
}
const createSquareConfigSecond = (config: SquareConfigSecond) => {
  console.log(config.width);
};
createSquareConfigSecond({ colour: "red", width: 20 });

// 函数类型
// 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和返回值类型的函数定义。参数列表里面的每个参数都需要名字和类型。
interface SearchFunc {
  (source: string, substring: string): boolean;
}
let mySearch: SearchFunc;
mySearch = (src: string, sub: string) => {
  const result = src.search(sub);
  return result > -1;
};

// 函数的参数名不需要与接口定义的名字相匹配

// 可索引的类型
// 可索引类型具有一个索引签名，他描述了对象索引的类型，还有相应的索引返回值类型。
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;
myArray = ["Bold", "Fred"];

let myStr: string = myArray[0];
console.log(myStr); // Bold

// TypeScript支持两种索引签名：字符串和数字。
</script>

<style lang="scss" scoped></style>
