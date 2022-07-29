<template>
  <div class="p-[16px]">
    <div>{{ params1 }}</div>
    <div>{{ params2 }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from "vue";
// let
let params1: Ref<string> = ref("let");
params1.value = "let change";
// const
const params2 = ref<number>(1);
</script>

<style lang="scss" scoped></style>
