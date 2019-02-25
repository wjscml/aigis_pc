import { loadLoginState } from 'common/js/cache'

const state = {
  userInfo: loadLoginState(),
  searchWord: ''
}

export default state
