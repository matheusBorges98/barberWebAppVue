import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state() {
    return {
        propriedades: {},
    }
  },
  getters: {
      getPropriedades(state) {
          return state.propriedades
      },
  },
  mutations: {
    setPropriedades(state, propriedades) {
      if(propriedades){
        state.propriedades = {...state.propriedades, ...propriedades};
      }
      
    },
  },
})

export default store
