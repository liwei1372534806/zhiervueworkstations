import request from '@/utils/request'

const productApi = {
  app_user: '/product/tools/user',
  check_mobile: '/product/checkMobile',
  check_storage: '/product/checkStorage',
  create_product: '/product/createManManProudct'

}


export function getAppUser(parameter) {
  return request({
    url: productApi.app_user,
    method: 'get',
    params: parameter
  })
}


export function updateAppUser(parameter) {
  return request({
    url: productApi.app_user,
    method: 'post',
    data: parameter
  })
}




