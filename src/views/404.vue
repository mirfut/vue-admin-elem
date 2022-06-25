<script lang="ts" setup>
import page404Png from '@/assets/page_404.png'
</script>

<template>
  <ElResult title="404" sub-title="Sorry, request error">
    <template #icon>
      <ElImage :src="page404Png" alt="Page 404"/>
    </template>
    <template #extra>
      <ElButton type="primary" @click="$router.go(-1)">Back</ElButton>
    </template>
  </ElResult>
</template>