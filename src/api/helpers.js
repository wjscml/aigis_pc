import axios from 'axios'

const urlMap = {
  development: '/apis',
  production: '/apis'
}
const baseUrl = urlMap[process.env.NODE_ENV]

const ERR_OK = '0'
const FAIL = '1000'

export function postApi (apiRoute) {
  return function (params) {
    return axios({
      method: 'post',
      url: baseUrl + `/site/index?method=${apiRoute}&format=json`,
      data: params,
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
    }).then((res) => {
      const { errorCode, data, errorMessage } = res.data
      if (errorCode === ERR_OK) {
        return data
      }
      if (errorCode === FAIL) {
        let errorMessage = '操作频繁，请稍后再试'
        return { data, errorMessage }
      }
      if (errorCode === '216' || '211' || '201' || 1) {
        return { data, errorMessage, errorCode }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function postFileApi (apiRoute) {
  return function (params) {
    return axios({
      method: 'post',
      url: baseUrl + `/site/index?method=${apiRoute}&format=json`,
      data: params
    }).then((res) => {
      const { errorCode, data, errorMessage } = res.data
      if (errorCode === ERR_OK) {
        return data
      }
      if (errorCode === FAIL) {
        let errorMessage = '操作频繁，请稍后再试'
        return { data, errorMessage }
      }
      if (errorCode === '216' || '211' || '201' || 1) {
        return { data, errorMessage, errorCode }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function postNewsApi (apiRoute) {
  return function (params) {
    return axios({
      method: 'post',
      url: baseUrl + `/news/site/index?method=${apiRoute}&format=json`,
      data: params,
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
    }).then((res) => {
      const { errorCode, data, errorMessage } = res.data
      if (errorCode === ERR_OK) {
        return data
      }
      if (errorCode === FAIL) {
        let errorMessage = '操作频繁，请稍后再试'
        return { data, errorMessage }
      }
      if (errorCode === '216' || '211' || '201' || 1) {
        return { data, errorMessage, errorCode }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
