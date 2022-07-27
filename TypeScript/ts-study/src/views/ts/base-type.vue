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
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
// 基础类型
// 布尔值
let isBool = ref<boolean>(true);
// 数字
const isNum = ref<number>(2);
</script>

<style lang="scss" scoped></style>
