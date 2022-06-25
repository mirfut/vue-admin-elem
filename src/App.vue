<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import ru from 'element-plus/lib/locale/lang/ru'

const locale = ru
</script>
<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>