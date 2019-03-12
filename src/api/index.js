import { postApi, postFileApi, postNewsApi } from './helpers'

const getLogin = postApi('user.login')
const getLoginByMobileCode = postApi('user.loginByMobileCode')
const getForget = postApi('user.retrievePassword')
const getCaptcha = postApi('user.getCaptcha')
const getMobileCode = postApi('user.getMobileCode')
const getIndicators = postApi('indicator.getIndicators')
const addFavorIndicator = postApi('indicator.addFavorIndicator')
const getFavorIndicatorList = postApi('indicator.getFavorIndicatorList')

const getDigiccyScroll = postApi('web.getDataCoinSlide')
const getDigiccyList = postApi('web.getCoinList')

const getRecommend = postApi('web.getSpecialRecommend')
const getHot = postApi('web.getTop10')
const getCategories = postNewsApi('article.categories')
const getNewsList = postNewsApi('article.getList')
const getNewsDetail = postNewsApi('article.getDetail')

const getNomalList = postApi('report.getNomalList')
const getSpecialList = postApi('report.getSpecialList')
const getReportContent = postApi('report.getReportContent')
const getFollowList = postApi('purchase.getList')
const getLastTimeData = postApi('quantification.getLastTimeData')
const getValueList = postApi('assetmanagement.getList')

const getHistoryChartData = postApi('quantification.tradingview')
const getDaysData = postApi('quantification.getDaysData')

const getColumnist = postApi('user.getAuthorList')
const getColumnistAuthor = postApi('user.authorPublish')

const getSearchList = postApi('article.getSearchList')

const changeUserInfo = postFileApi('user.changeUserInfo')

export {
  getLogin,
  getLoginByMobileCode,
  getForget,
  getCaptcha,
  getMobileCode,
  getIndicators,
  addFavorIndicator,
  getFavorIndicatorList,

  getDigiccyScroll,
  getDigiccyList,

  getRecommend,
  getHot,
  getCategories,
  getNomalList,
  getSpecialList,
  getReportContent,
  getFollowList,
  getValueList,
  getLastTimeData,

  getHistoryChartData,
  getDaysData,

  getNewsList,
  getNewsDetail,
  getColumnist,
  getColumnistAuthor,

  getSearchList,

  changeUserInfo
}
