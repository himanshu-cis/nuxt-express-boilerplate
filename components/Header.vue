<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">Posts</a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link to="/" class="navbar-item">
          Home
        </nuxt-link>
        <nuxt-link to="/" class="navbar-item">
          Posts
        </nuxt-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" @click="showRegister">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="showLogin">Log in</a>
          </div>
        </div>
      </div>
    </div>
    <login />
    <register />
  </nav>
</template>

<script>
import Login from './Login'
import Register from './Register'
export default {
  components: {
    Login,
    Register
  },
  methods: {
    showLogin () {
      this.$store.commit('misc/toggleLogin')
    },
    showRegister () {
      this.$store.commit('misc/toggleRegister')
    }
  }
}
</script>
