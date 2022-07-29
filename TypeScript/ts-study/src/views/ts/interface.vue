<template>
  <div class="p-[16px]"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

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
</script>

<style lang="scss" scoped></style>
