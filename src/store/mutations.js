import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGIN_STATE] (state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_SEARCH_WORD] (state, searchWord) {
    state.searchWord = searchWord
  }
}

export default mutations
