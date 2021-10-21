import request from '@/utils/request'

const kafkaApi = {
  options_list: '/middleware/kafka/topics',
  data_list: '/middleware/kafka/topic/list'
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


