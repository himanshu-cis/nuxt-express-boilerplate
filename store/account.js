import { statement } from "@babel/template"

const initialState = {
  email: null,
  password: null,
  first_name: null,
  last_name: null,
  user: {},
  success: null,
  error: false
}

const notificationConfig = () => ({
  timeout: 3000,
  showProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  position: 'rightTop'
})

export const state = () => (initialState)

export const mutations = {
  reset(state, data) {
    state[data] = null
  },
  authenticate(state, data) {
    state.user = data
  },
  registered(state, data) {
    state.success = data
    state.error = null;
  },
  error(state, data) {
    state.error = data;
    state.success = null;
  }
}

export const actions = {
  login(store,  data) {
    return this.$auth.loginWith('local', { data })
      .then((res) => {
        store.commit('authenticate', res)
        store.dispatch('misc/toggleLogin', null, { root: true })
      })
  },
  register({ commit }, data) {
    return this.$axios.$post('/api/auth/register', data)
      .then((res) => {
        if (res.status) {
          commit('registered', res.message)
          store.dispatch('misc/toggleRegister', null, { root: true })
        } else {
          commit('error', res.message);
        }
      })
  },
  reset({ commit }, data) {
    return commit('reset', data)
  },
  notification(store, data) {

    if (data.type === 'ERROR') {
      this._vm.$snotify.error(data.message, notificationConfig())
      store.commit('error', data.message)
    } else {
      if (data.message) {
        this._vm.$snotify.success(data.message, notificationConfig())
      }
      
      store.commit('registered', data.message || true)
    }
  }
}
