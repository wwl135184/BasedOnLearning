<template>
  <div>
    <div class="p-[16px] font-bold">枚举</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

// 枚举

// 数字枚举
{
  enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
  }
  console.log(Direction.Down); // 2
}
// 我们定义一个数字枚举，Up使用出事为1。其余的成员会从1开始自动增长。

// 字符串枚举
{
  enum Direction {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right",
  }
}
</script>

<style lang="scss" scoped></style>
