import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGIN_STATE] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_SEARCH_WORD] (state, searchWord) {
    state.searchWord = searchWord
  },
  [types.SET_STICK_NUMBER] (state, stickNumber) {
    state.stickNumber = stickNumber
  }
}

export default mutations
