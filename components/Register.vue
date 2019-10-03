<template>
  <div class="modal" :class="{ 'is-active': open }">
    <div class="modal-background" />
    <div class="modal-content">
      <div class="card">
        <div class="card-header">
          <!-- {{isLoggedIn.firstName}} -->
          <h2 class="card-header-title">Login</h2>
        </div>
        <div class="card-content">
          <p class="alert">{{$store.state.auth.registeredSuccess}}</p>
          <form class="review-form" @submit.prevent="onSubmit">
            <div class="columns">
              <div class="field column">
                <label class="label">First Name</label>
                <div class="control">
                  <input v-model="firstName" class="input" type="text" placeholder="Enter first name..." />
                </div>
              </div>
              <div class="field column">
                <label class="label">Last Name</label>
                <div class="control">
                  <input v-model="lastName" class="input" type="text" placeholder="Enter last name..." />
                </div>
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input v-model="email" class="input" type="email" placeholder="Enter email..." />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  placeholder="Enter password..."
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Repeat Password</label>
              <div class="control">
                <input
                  v-model="repeatPassword"
                  class="input"
                  type="password"
                  placeholder="Enter password..."
                />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link">Login</button>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      repeatPassword: null
    };
  },
  computed: {
    open() {
      return this.$store.state.misc.registerModal;
    },
    isLoggedIn() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    ...mapActions(["auth/register"]),
    close() {
      this.$store.commit("misc/toggleRegister");
    },
    onSubmit() {
      const creds = {
        firstName: this.firstName,
        lastName:this.lastName,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      };

      this.$store.dispatch("auth/register", creds)
    }
  },
  created: () => {
    if(this.$store.state.auth.registeredSuccess) {
      this.data = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        repeatPassword: null
      };
    }
  }
};
</script>
