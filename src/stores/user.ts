import { removeCookie, setCookie, sleep } from "@/utils"
import { defineStore } from "pinia"
import request from "@/utils/request"
import { ElMessage } from "element-plus"

export const userStore = defineStore('user', {
  state: (): Stores.user => ({
    name: '',
    uuidid: '',
    token: '',
  }),
  actions: {
    async login(username: string, password: string) {
      return new Promise((resolve, reject) => {
        request.post('/user/login', {
          username, password
        }).then(res => {
          const { data, msg } = res.data
          console.log(data)
          console.log(msg)
          if (data) {
            this.name = data.fullnameinitials
            this.uuidid = data.uuidid
            this.token = data.token
            setCookie('token', this.token)
            resolve(msg)
          } else {
            reject(msg)
          }
        })
      })
    },
    async logout() {
      return new Promise((resolve) => {
        request.get('/user/logout').then(res => {
          const { msg } = res.data
          removeCookie('token')
          ElMessage.success(msg)
          resolve(msg)
        })
      })
    },
    async getUserInfo(token: string): Promise<string> {
      return new Promise((resolve, reject) => {
        request.get('/user/info', {
          params: {
            token: token
          }
        }).then(res => {
          const { data, msg } = res.data
          if (data) {
            this.name = data.fullnameinitials
            this.uuidid = data.uuidid
            this.token = data.token
            setCookie('token', this.token)
            resolve(msg)
          } else {
            reject(msg)
          }
        })
      })
    }
  }
})