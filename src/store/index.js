import { createStore } from 'vuex'
import coaches from './modules/coaches/index'
import requests from './modules/requests/index'
import auth from './modules/auth/index'

const store = createStore({
  modules: {
    auth,
    coaches,
    requests,
  },
})

export default store
