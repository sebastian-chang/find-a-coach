import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: false,
  state () {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    }
  },
  actions,
  getters,
  mutations,
}
