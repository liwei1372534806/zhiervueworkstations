import request from '@/utils/request'

const kafkaApi = {
  options_list: '/middleware/kafka/topics',
  data_list: '/middleware/kafka/topic/list',
  push_message:'/middleware/kafka/push/'
}

export function getTopics(parameter) {
  return request({
    url: kafkaApi.options_list,
    method: 'get',
    params: parameter
  })
}

export function getTopicList(parameter) {
  return request({
    url: kafkaApi.data_list,
    method: 'get',
    params: parameter
  })
}


export function pushMessage(parameter) {
  return request({
    url: kafkaApi.push_message,
    method: 'get',
    params: parameter
  })
}

