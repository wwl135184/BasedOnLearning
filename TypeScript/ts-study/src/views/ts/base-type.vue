<template>
  <!-- 基础类型 -->
  <div class="p-[16px]">
    <div>
      <span v-if="isBool">1、布尔值</span>
      <el-button type="primary" @click="isBool = !isBool" class="ml-[16px]">{{
        isBool ? "隐藏" : "显示"
      }}</el-button>
    </div>
    <div class="mt-[16px]">
      <span>2、数字 {{ isNum }}</span>
      <el-button type="primary" @click="isNum++" class="ml-[16px]">+</el-button>
    </div>
    <div class="mt-[16px]">3、{{ isStr }}</div>
    <div class="mt-[16px]">
      <span class="mr-[16px]">4、数组</span>
      <el-button v-for="num in isArr" :key="num">{{ num }}</el-button>
    </div>

    <div class="mt-[16px]">
      <span>5、枚举 </span>
      <span>{{ c }} {{ b }}</span>
    </div>
    <div class="mt-[16px]">
      <span>6、Any </span>
      <span>{{ notSure }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 基础类型
// 布尔值
const isBool = ref<boolean>(true);
// 数字
const isNum = ref<number>(2);
// 字符串
const isStr = ref<string>("字符串");
// 数组
const isArr = ref<number[]>([1, 2, 3]);
// 元组 Tuple
const x: [number, string] = [1, "string"];
// 枚举
const enum Color {
  Red,
  Green = 3,
  Blue,
}
const c: Color = Color.Green;
const b: string = Color["3"];
// Any
let notSure: any = 4;
notSure = true;
notSure = "any";
// Void
const warnUser = (): void => {
  console.log("This is my warning message");
};
const unusable: void = undefined;
// Null和Undefined
const u: undefined = undefined;
const n: null = null;
// 可以把null和undefined赋予给number值
// Never
const error = (msg: string): never => {
  throw new Error(msg);
};
const fail = (): never => {
  return error("Something failed");
};
// Object
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
const create = (o: object | null): void => {};
create({ prop: 0 });
// 类型断言
// 类型断言有两种形式
// 尖括号
const someValue: any = "this is a string";
const strLength: number = (<string>someValue).length;
// as
const strLengthAs: number = (someValue as string).length;
</script>

<style lang="scss" scoped></style>
