/**
 * @param key cookie key
 * @param value the value of the cookie
 * @param expires The expiration time (days) of the cookie
 * @param path Cookie effective path range, the default "/" global effective
 */
export function setCookie(key: string, value: string | number, expires: number = 0, path: string = '/') {
  let cookie = `${key}=${value};path=${path}`
  if (expires !== 0) {
    const date = new Date()
    date.setDate(date.getDate() + expires)
    cookie += `;expires=${date.toUTCString()}`
  }
  document.cookie = cookie
}

/**
 * @param key cookie key
 * @returns the value of the cookie
 */
export function getCookie(key: string) {
  const reg = new RegExp("(^| )" + key + "=([^;]+)")
  const match = document.cookie.match(reg)
  return match ? match[2] : ""
}

export function removeCookie(key: string) {
  setCookie(key, '', -1)
}

/**
 * @param ms Sleep time (ms)
 * @returns Promise<unknown>
 */
export function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('wake up')
    }, ms)
  })
}