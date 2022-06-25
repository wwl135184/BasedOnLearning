<template>
  <div>{{ userStore.userName }}</div>
  <div>{{ userStore.nickName }}</div>
  <div>{{ userStore.token }}</div>
</template>

<script setup lang="ts">
import { useUserStore } from "../store/modules/user";

const userStore = useUserStore();

userStore.login("token");
</script>

<style lang="scss" scoped></style>
