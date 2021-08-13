import request from '@/utils/request'

const esApi = {
  options_list: '/middleware/es/esAlias',
  data_list: '/middleware/table/list',
  alias_index: '/middleware/es/esIndex',
  change_index: '/middleware/es/esChangeIndex'
}

export function getOptions() {
  return request({
    url: esApi.options_list,
    method: 'get'
  })
}


export function getEslist(parameter) {
  return request({
    url: esApi.options_list,
    method: 'get',
    params: parameter
  })
}

export function getEsIndexList(parameter) {
  return request({
    url: esApi.alias_index,
    method: 'get',
    params: parameter
  })
}

export function changeIndex(parameter) {
  return request({
    url: esApi.change_index,
    method: 'post',
    data: parameter
  })
}