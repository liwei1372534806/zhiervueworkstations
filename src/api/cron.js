import request from '@/utils/request'

const cronApi = {
  data_list: '/job/list',
  add: '/job/addJob',
  remove: '/job/removeJob',
  stop: '/job/pauseJob',
  start: '/job/startJob',
}

export function getList() {
  return request({
    url: cronApi.data_list,
    method: 'get'
  })
}


export function addJob(parameter) {
  return request({
    url: cronApi.add,
    method: 'post',
    data: parameter
  })
}

export function removeJob(parameter) {
  return request({
    url: cronApi.remove,
    method: 'post',
    data: parameter
  })
}

export function stopJob(parameter) {
  return request({
    url: cronApi.stop,
    method: 'post',
    data: parameter
  })
}

export function startJob(parameter) {
  return request({
    url: cronApi.start,
    method: 'post',
    data: parameter
  })
}