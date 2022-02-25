import request from '@/utils/request'

const productApi = {
  options_list: '/product/baseEnum',
  check_mobile: '/product/checkMobile',
  check_storage: '/product/checkStorage',
  create_product: '/product/createManManProudct',
  app_submit_product: '/product/appSubmitProduct'

}

export function appsubmitProduct(parameter) {
  return request({
    url: productApi.app_submit_product,
    method: 'post',
    data: parameter
  })
}



export function createProduct(parameter) {
  return request({
    url: productApi.create_product,
    method: 'post',
    data: parameter
  })
}


export function getOptions(parameter) {
  return request({
    url: productApi.options_list,
    method: 'get',
    params: parameter
  })
}


export function checkMobile(parameter) {
  return request({
    url: productApi.check_mobile,
    method: 'get',
    params: parameter
  })
}


export function checkStorage(parameter) {
  return request({
    url: productApi.check_storage,
    method: 'get',
    params: parameter
  })
}