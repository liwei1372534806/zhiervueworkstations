import request from '@/utils/request'

const userApi = {
  Login: '/login/login_token/',
  Logout: '/auth/logout',
  ForgePassword: '/user/update_user/',
  Register: '/user/',
  // get my info
  UserInfo: '/login/user_info/',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function register(parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter
  })
}

export function changePassword(parameter) {
  return request({
    url: userApi.ForgePassword,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return request({
    url: userApi.UserInfo,
    method: 'get'
  })
}

export function getCurrentUserNav() {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
// export function get2step(parameter) {
//   return request({
//     url: userApi.twoStepCode,
//     method: 'post',
//     data: parameter
//   })
// }
