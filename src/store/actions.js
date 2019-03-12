import * as types from './mutation-types'
import { saveLoginState, saveStick } from '../common/js/cache'

export const saveUserInfo = function ({ commit }, val) {
  commit(types.SET_LOGIN_STATE, saveLoginState(val))
}

export const saveStickNumber = function ({ commit }, val) {
  commit(types.SET_STICK_NUMBER, saveStick(val))
}
