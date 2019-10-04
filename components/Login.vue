<template>
  <div class="modal" :class="{ 'is-active': open }">
    <div class="modal-background" />
    <div class="modal-content">
      <div class="card">
        <div class="card-header">
          <h2 class="card-header-title">Login</h2>
        </div>
        <div class="card-content">
          <form class="review-form" @submit.prevent="onSubmit">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  :class="validate('email') && 'is-success'"
                  class="input"
                  type="email"
                  placeholder="Enter email..."
                />
                <p class="help is-danger" v-if="validate('email')">This is a required field</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  :class="validate('password') && 'is-success'"
                  type="password"
                  placeholder="Enter password..."
                />
                <p class="help is-danger" v-if="validate('password')">This is a required field</p>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-link" :disabled="validate()">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button class="modal-close is-large"  aria-label="close" @click="close" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const initialState = () => ({
  email: null,
  password: null,
  submitted: false
});

export default {
  data() {
    return initialState();
  },
  computed: {
    open() {
      return this.$store.state.misc.loginModal;
    },
    isLoggedIn() {
      return this.$store.state.account.user;
    }
  },
  methods: {
    ...mapActions(["account/login"]),
    close() {
      this.$store.commit("misc/toggleLogin");
    },
    onSubmit() {
      this.submitted = true;
      const creds = {
        email: this.email,
        password: this.password
      };

      this.$store.dispatch("account/login", creds);
    },
    validate(type = null) {

      if(!this.submitted) {
        return false;
      }

      if (!type) {
        return !this.email || !this.password;
      }

      return !this[type];
    },
    reset() {
      Object.assign(this.$data, initialState())
    }
  }
};
</script>
