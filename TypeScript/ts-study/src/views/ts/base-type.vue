<template>
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
      <span>{{ c }}</span>
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
  Green,
  Blue,
}
let c: Color = Color.Green;
</script>

<style lang="scss" scoped></style>
