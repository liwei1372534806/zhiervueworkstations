import request from '@/utils/request'

const loginApi = {
  login: '/login/login_token/',
}

// export function login() {
//   return request({
//     url: mongoApi.login,
//     method: 'get'
//   })
// }


export function login(parameter) {
  return request({
    url: loginApi.login,
    method: 'post',
    data: parameter
  })
}