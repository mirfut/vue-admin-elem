<script lang="ts" setup>
import Shadow from './Shadow.vue'
import { CloseBold } from '@element-plus/icons-vue'
import isMobile from '@/composables/isMobile'
import Loading from './Loading.vue'

const props = withDefaults(defineProps<{
  show: boolean
  width?: string
  height?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  loading?: boolean
  preventShadowEvent?: boolean
  showClose?: boolean
  transition?: transitionType
}>(), {
  width: '40rem',
  height: 'auto',
  maxWidth: '90vw',
  minHeight: '25rem',
  maxHeight: '90vh',
  loading: false,
  preventShadowEvent: true,
  showClose: true,
  transition: 'fade-scale'
})

const _isMobile = isMobile()
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

function shadowClick() {
  // If the close button is displayed (the close button will be automatically 
  // hidden on the mobile phone, close the persuasion flow and turn to the click shadow)
  if (props.showClose) {
    // And not on the mobile phone, then give the close right to the close button
    if (!_isMobile.value && props.preventShadowEvent) return
  }
  emit('update:show', false)
}

</script>
<template>
  <Teleport to="body">
    <Transition :name="props.transition" mode="out-in" appear>
      <Shadow v-if="props.show" contentCenter @shadowClick="shadowClick">
        <div :style="{ position: 'relative', maxHeight: props.maxHeight }">
          <div class="block shadow modal"
            :style="{ width: props.width, height: props.height, maxWidth: props.maxWidth, minHeight: props.minHeight, maxHeight: props.maxHeight }">
            <Loading v-if="props.loading"></Loading>
            <template v-else>
              <slot name="modalHeader"></slot>
              <main class="modal-main">
                <slot></slot>
              </main>
              <slot name="modalFooter"></slot>
            </template>
          </div>
          <el-icon v-if="!_isMobile && props.showClose" class="icon-close" @click="emit('update:show', false)">
            <CloseBold />
          </el-icon>
        </div>
      </Shadow>
    </Transition>
  </Teleport>
</template>
<style scoped>
.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.modal-main {
  flex: 1;
  overflow: auto;
  width: 100%;
  height: 100%;
}

.icon-close {
  position: absolute;
  top: .3rem;
  right: -2rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
}
</style>