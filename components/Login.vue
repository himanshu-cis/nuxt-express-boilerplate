<template>
  <div class="modal" :class="{ 'is-active': open }">
    <div class="modal-background" />
    <div class="modal-content">
      <div class="card">
        <div class="card-header">
          <!-- {{isLoggedIn.firstName}} -->
          <h2 class="card-header-title">
            Login
          </h2>
        </div>
        <div class="card-content">
          <form class="review-form" @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model="email" class="input" type="email" placeholder="Enter email...">
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input v-model="password" class="input" type="password" placeholder="Enter password...">
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="close" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  computed: {
    open () {
      return this.$store.state.misc.loginModal
    },
    isLoggedIn () {
      return this.$store.state.auth.user
    }
  },
  methods: {
    ...mapActions([
      'auth/login'
    ]),
    close () {
      this.$store.commit('misc/toggleLogin')
    },
    onSubmit () {
      const creds = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('auth/login', creds)
    }
  }
}
</script>
