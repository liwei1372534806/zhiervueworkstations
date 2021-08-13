import request from '@/utils/request'

const redisApi = {
  index_list: '/middleware/redisIndex',
  delete: '/middleware/redisDelete'
}

export function getlist(parameter) {
  return request({
    url: redisApi.index_list,
    method: 'get',
    params: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


export function deleteKey(parameter) {
  return request({
    url: redisApi.delete,
    method: 'post',
    data: parameter
  })
}