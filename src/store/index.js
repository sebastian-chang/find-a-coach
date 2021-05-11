import { createStore } from 'vuex'
import coaches from './modules/coaches/index'

const store = createStore({
  modules: {
    coaches
  },
})

export default store
