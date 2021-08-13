import request from '@/utils/request'

const mongoApi = {
  options_list: '/middleware/list',
  data_list: '/middleware/table/list'
}

export function getOptions() {
  return request({
    url: mongoApi.options_list,
    method: 'get'
  })
}


export function getMongoList(parameter) {
  return request({
    url: mongoApi.data_list,
    method: 'post',
    data: parameter
  })
}