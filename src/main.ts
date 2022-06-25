import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { mock, mockEnv } from './appConfig'
import enableMock from './mock'
import '@/styles/index.postcss' // global style
import 'virtual:svg-icons-register'
import './permission'
import 'element-plus/theme-chalk/el-message.css' // message style

mockEnv.includes(import.meta.env.MODE as envType) && mock === 'on' && enableMock()

createApp(App).use(createPinia()).use(router).mount('#app')
