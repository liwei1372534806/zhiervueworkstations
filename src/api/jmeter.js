import request from '@/utils/request'

const jmeterApi = {
  get_report: 'jmeter/getReport',
  create_report: 'jmeter/createReport'
}

export function getReport() {
  return request({
    url: jmeterApi.get_report,
    method: 'get'
  })
}


export function createReport() {
  return request({
    url: jmeterApi.create_report,
    method: 'get'
  })
}