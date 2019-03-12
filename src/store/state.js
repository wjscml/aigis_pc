import { loadLoginState, loadStick } from 'common/js/cache'

const state = {
  userInfo: loadLoginState(),
  searchWord: '',
  stickNumber: loadStick()
}

export default state
