import { postApi, postFileApi } from './helpers'

const getLogin = postApi('user.login')
const getRegister = postApi('user.register')
const getForget = postApi('user.retrievePassword')
const getCaptcha = postApi('user.getCaptcha')
const getMobileCode = postApi('user.getMobileCode')
const getWxLogin = postApi('user.wxLogin')
const getDigiccyScroll = postApi('web.getDataCoinSlide')
const getDigiccyList = postApi('web.getCoinList')
const getIndexHeader = postApi('web.getIndexHeader')
const getRecommend = postApi('web.getSpecialRecommend')
const getHot = postApi('web.getTop10')
const getCategories = postApi('article.categories')
const getNewsList = postApi('article.getList')
const getNewsDetail = postApi('article.getDetail')
const getColumnist = postApi('user.getAuthorList')
const getColumnistAuthor = postApi('user.authorPublish')
const collectArticle = postApi('article.keep')
const focusAuthor = postApi('user.follow')
const getSearchList = postApi('article.getSearchList')
const getCollectList = postApi('article.getKeepList')
const getFocusList = postApi('user.getFollowAuthorList')
const getAbout = postApi('site.about')
const getSign = postApi('site.sign')
const changeUserInfo = postFileApi('user.changeUserInfo')
const getCertificateStatus = postApi('user.getCertificateStatus')
const deleteCertificate = postApi('user.certificateDelete')
const getMyArticle = postApi('user.getMysubmission')
const contribute = postFileApi('user.submission')
const getMyArticleContent = postApi('user.getSubmissionContent')

export {
  getLogin,
  getRegister,
  getForget,
  getCaptcha,
  getMobileCode,
  getWxLogin,
  getDigiccyScroll,
  getDigiccyList,
  getIndexHeader,
  getRecommend,
  getHot,
  getCategories,
  getNewsList,
  getNewsDetail,
  getColumnist,
  getColumnistAuthor,
  collectArticle,
  focusAuthor,
  getSearchList,
  getCollectList,
  getFocusList,
  getAbout,
  getSign,
  changeUserInfo,
  getCertificateStatus,
  deleteCertificate,
  getMyArticle,
  contribute,
  getMyArticleContent
}
