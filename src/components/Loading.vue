<script lang="ts" setup>
import loadingGif from '@/assets/loading.gif'
</script>

<template>
  <div class="loading-wrapper">
    <img class="loading-gif" :src="loadingGif" alt="Loading...">
  </div>
</template>

<style scoped>
.loading-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.loading-gif {
  width: 5rem;
  height: auto;
  object-fit: contain;
}
</style>