<script setup lang="ts">
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../stores/user'
import BreadCrumb from './BreadCrumb.vue'
import { Fold, ArrowRightBold } from '@element-plus/icons-vue'

const sidebarRelated = inject<Layout.SidebarRelated>('sidebarRelated')
const loading = inject<Layout.Loading>('loading')
const user = userStore()
const router = useRouter()

function logout() {
  if (loading) loading.logout = true
  user.logout().then(_ => {
    router.replace('/login')
  })
}
</script>

<template>
  <header>
    <section>
      <ElIcon :class="['icon-sidebar-trigger', sidebarRelated?.collapsed && 'collapsed']"
        @click="sidebarRelated && (sidebarRelated.collapsed = !sidebarRelated.collapsed)">
        <Fold />
      </ElIcon>
      <BreadCrumb :withIcons="true"></BreadCrumb>
    </section>
    <section>
      <span style="margin-right: 1rem">{{ user.name }}</span>
      <ElButton type="primary" :icon="ArrowRightBold" circle :loading="loading?.logout" @click="logout" title="sign out">
      </ElButton>
    </section>
  </header>
</template>

<style scoped lang="postcss">
header {
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  & section {
    &:first-of-type {
      display: inline-flex;
      flex-wrap: nowrap;
      align-items: center;
      flex-shrink: 0;
      overflow: hidden;
      flex: 1
    }

    &:last-of-type {
      display: inline-flex;
      flex-wrap: nowrap;
      flex-shrink: 0;
      align-items: center;
    }
  }
}

.icon-sidebar-trigger {
  cursor: pointer;
  margin-right: 1.2rem;
  font-size: 1.2rem;

  &.collapsed {
    transform: rotate(180deg);
  }
}
</style>