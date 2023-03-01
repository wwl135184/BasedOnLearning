<template>
  <div>
    <div class="p-[16px] font-bold">泛型</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
// 泛型

// 泛型之Hello World

// identity函数
// 不使用泛型
{
  function identity(arg: number): number {
    return arg;
  }
}
// 使用any类型来定义函数
{
  function identity(arg: any): any {
    return arg;
  }
}
</script>

<style lang="scss" scoped></style>
