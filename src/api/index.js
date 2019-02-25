import { postApi, postFileApi } from './helpers'

const getLogin = postApi('user.login')
const getLoginByMobileCode = postApi('user.loginByMobileCode')
const getForget = postApi('user.retrievePassword')
const getCaptcha = postApi('user.getCaptcha')
const getMobileCode = postApi('user.getMobileCode')
const getIndicators = postApi('indicator.getIndicators')
const getDigiccyScroll = postApi('web.getDataCoinSlide')
const getDigiccyList = postApi('web.getCoinList')

const getRecommend = postApi('web.getSpecialRecommend')
const getHot = postApi('web.getTop10')
const getCategories = postApi('article.categories')
const getNewsList = postApi('article.getList')

const getNomalList = postApi('report.getNomalList')
const getSpecialList = postApi('report.getSpecialList')
const getReportContent = postApi('report.getReportContent')

const getNewsDetail = postApi('article.getDetail')
const getColumnist = postApi('user.getAuthorList')
const getColumnistAuthor = postApi('user.authorPublish')

const getSearchList = postApi('article.getSearchList')

const getAbout = postApi('site.about')
const getSign = postApi('site.sign')
const changeUserInfo = postFileApi('user.changeUserInfo')

export {
  getLogin,
  getLoginByMobileCode,
  getForget,
  getCaptcha,
  getMobileCode,
  getIndicators,
  getDigiccyScroll,
  getDigiccyList,

  getRecommend,
  getHot,
  getCategories,
  getNomalList,
  getSpecialList,
  getReportContent,
  getNewsList,
  getNewsDetail,
  getColumnist,
  getColumnistAuthor,

  getSearchList,

  getAbout,
  getSign,
  changeUserInfo
}
