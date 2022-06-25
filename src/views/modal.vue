<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import { reactive } from 'vue'
const dialogs = reactive({
  dialog1: {
    show: false,
    loading: false,
    timeout: <NodeJS.Timeout | null>null,
    transition: <transitionType>'slide-down'
  }
})

function showDialog(transition: transitionType) {
  dialogs.dialog1.timeout && clearTimeout(dialogs.dialog1.timeout)
  dialogs.dialog1.loading = true
  dialogs.dialog1.transition = transition
  dialogs.dialog1.show = true
  dialogs.dialog1.timeout = setTimeout(() => {
    dialogs.dialog1.loading = false
  }, 2000)
}
</script>

<template>
  <div>
    <Dialog v-model:show="dialogs.dialog1.show" :loading="dialogs.dialog1.loading"
      :transition="dialogs.dialog1.transition">
      <template #modalHeader>
        <div style="height: 3rem; background-color: aquamarine;">modal header</div>
      </template>
      <div style="width: 100%; height: 80%;  background-color: lightblue;">
        Modal box content
      </div>
      <template #modalFooter>
        <div style="height: 3rem; background-color: bisque;">bottom of modal</div>
      </template>
    </Dialog>
    <ElButton @click="showDialog('fade')">fade modal</ElButton>
    <ElButton @click="showDialog('fade-scale')">fade-scale modal</ElButton>
    <ElButton @click="showDialog('slide-up')">slide-up modal</ElButton>
    <ElButton @click="showDialog('slide-down')">slide-down modal</ElButton>
    <ElButton @click="showDialog('slide-left')">slide-left modal</ElButton>
    <ElButton @click="showDialog('slide-right')">slide-right modal</ElButton>
  </div>
</template>

<style>
</style>