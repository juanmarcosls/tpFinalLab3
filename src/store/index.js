import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario:'',
    correcto:false,
    cantBtc:0,
    cantAda:0,
    cantSol:0
  },
  mutations: {
    setUsuario(state,nuevoUsuario){
      state.usuario=nuevoUsuario;
    },
    setCorrecto(state,nuevoCorrecto){
       state.correcto=nuevoCorrecto
    },
    setcantBtc(state,nuevaCantBtc){
      state.cantBtc=nuevaCantBtc
    },
    setcantAda(state,nuevaCantAda){
      state.cantAda=nuevaCantAda
    },
    setcantSol(state,nuevaCantSol){
      state.cantSol=nuevaCantSol
    }

 },
  
  actions: {
  },
  modules: {
  }
})

