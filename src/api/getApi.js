import axios from 'axios'

const service = axios.create({
  baseURL: 'http://api.dev.aigis.com'
})

export function postApi (apiRoute, param) {
  return service({
    method: 'post',
    url: `/site/index?method=${apiRoute}&format=json`,
    data: param,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
export function postFileApi (apiRoute, param) {
  return service({
    method: 'post',
    url: `/site/index?method=${apiRoute}&format=json`,
    data: param
  })
}
