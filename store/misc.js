export const state = () => ({
  loginModal: false,
  registerModal: false
})

export const mutations = {
  toggleLogin (state) {
    state.loginModal = !state.loginModal
  },
  toggleRegister (state) {
    state.registerModal = !state.registerModal
  }
}
