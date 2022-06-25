const users: ({ username: string, password: string } & Stores.user)[] = [
  {
    username: 'firstuser',
    password: '123456',
    name: 'First user',
    age: 23,
    sex: 'male',
    token: 'firstuserToken'
  }, {
    username: 'seconduser',
    password: '123456',
    name: 'Second user',
    age: 49,
    sex: 'female',
    token: 'seconduserToken'
  },
]

export default <MockApi.obj[]>[
  {
    url: '/login',
    type: 'post',
    response: (options) => {
      const failRes: MockApi.response = {
        code: 200,
        msg: 'failed to login',
        data: null
      }
      if (!options.body) return failRes
      const { username, password } = options.body
      const user = users.find(user => user.username === username)
      if (!user || user.password !== password) return failRes
      return {
        code: 200,
        msg: 'login successful',
        data: user
      }
    }
  },
  {
    url: '/logout',
    type: 'get',
    response: {
      code: 200,
      msg: 'Logout succeeded',
      data: 'logout success'
    }
  },
  {
    url: '/info\\?token=.*',
    type: 'get',
    response: (options) => {
      const failRes: MockApi.response = {
        code: 200,
        msg: 'Failed to get user',
        data: null
      }
      // get token
      const token = options.url.slice(options.url.indexOf('=') + 1)
      if (!token) return failRes
      const user = users.find(user => user.token === token)
      if (!user) return failRes
      return {
        code: 200,
        msg: 'Obtain user information successfully',
        data: user
      }
    }
  }
]