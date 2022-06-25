import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { appTitle } from './appConfig'
import { getCookie, removeCookie } from './utils'
import { userStore } from './stores/user'
import { ElMessage } from 'element-plus'

NProgress.configure({ showSpinner: false })

const whitelist: string[] = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // set page title
  document.title = `${to.meta.title}-${appTitle}`
  // The path hits the whitelist and is allowed to pass
  if (whitelist.includes(to.path)) next()
  else {
    // Determine if there is a token
    const token = getCookie('token')
    const user = userStore()
    if (!token) {
      next('/login')
    } else if (!user.token) {
      try {
        await user.getUserInfo(token)
        next()
      } catch (_) {
        ElMessage.error('The token is invalid, please log in again')
        removeCookie('token') // clear cookies
        next('/login')
      }
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
