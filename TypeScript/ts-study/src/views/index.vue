<template>
  <div class="p-[16px]">
    <div class="font-[18px] font-bold">目录</div>
    <div class="py-[16px]" v-for="(item, index) in catalogue" :key="index">
      <el-button type="primary" @click="btnClick(item)">{{
        item.name
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Catalogue } from "@/types/index.ts";

const router = useRouter();

const catalogue: Catalogue[] = [
  {
    name: "基础类型",
    path: "/base-type",
  },
];

const btnClick = (v: Catalogue) => {
  const { path } = v;
  router.push({
    path,
  });
};
</script>

<style lang="scss" scoped></style>
