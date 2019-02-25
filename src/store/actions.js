import * as types from './mutation-types'
import { saveLoginState } from '../common/js/cache'

export const saveUserInfo = function ({ commit }, val) {
  commit(types.SET_LOGIN_STATE, saveLoginState(val))
}
