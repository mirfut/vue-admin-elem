<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationMatched, RouteLocationNormalizedLoaded } from 'vue-router'

const route = useRoute()
const routeMatched = ref<RouteLocationMatched[]>([])
const props = withDefaults(defineProps<{
  withIcons?: boolean
}>(), {
  withIcons: false
})

onBeforeMount(() => refreshBreadCrumb(route))
watch(route, refreshBreadCrumb)

function refreshBreadCrumb(route: RouteLocationNormalizedLoaded) {
  routeMatched.value = route.matched.filter((item) => item.meta.breadcrumb !== false && !item.meta.hidden)
  if (routeMatched.value.length === 0) return
  if (routeMatched.value[0].path !== '/index') {
    routeMatched.value.unshift(<RouteLocationMatched>{
      path: '/index',
      name: 'index',
      meta: { title: 'Index', icon: 'house' }
    })
  }
}
</script>

<template>
  <ElBreadcrumb>
    <ElBreadcrumbItem v-for="(route, index) in routeMatched" :key="route.path">
      <ElIcon v-if="props.withIcons && route.meta.icon">
        <SvgIcon v-if="typeof route.meta.icon === 'string'" :iconName="(route.meta.icon as string)"></SvgIcon>
        <component v-else :is="route.meta.icon"></component>
      </ElIcon>
      <RouterLink custom :to="route.path" v-slot="{ navigate, href }">
        <a v-if="index < routeMatched.length - 1" :href="href" @click="navigate">&nbsp;{{ route.meta.title }}</a>
        <span v-else>&nbsp;{{ route.meta.title }}</span>
      </RouterLink>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
