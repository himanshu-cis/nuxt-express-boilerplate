import { statement } from "@babel/template"

const initialState = {
  email: null,
  password: null,
  first_name: null,
  last_name: null,
  user: {},
  registerSuccess: null
}

export const state = () => (initialState)

export const mutations = {
  reset(state, data) {
    state[data] = null
  },
  authenticate(state, data) {
    state.user = data
  },
  registered(state, data) {
    state.registeredSuccess = true
  }
}

export const actions = {
  login({ commit }, data) {
    return this.$axios.$post('/api/auth/login', data).then((res) => {
      commit('authenticate', res)
    })
  },
  register({ commit }, data) {
    return this.$axios.$post('/api/auth/register', data).then((res) => {
      commit('registered', res)
    })
  },
  reset({commit}, data) {
    return commit('reset', 'registeredSuccess')
  }
}
