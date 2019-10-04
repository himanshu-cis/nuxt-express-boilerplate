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
          <form class="review-form" @submit.prevent="onSubmit">
            <div class="columns">
              <div class="field column">
                <label class="label">First Name</label>
                <div class="control">
                  <input
                    v-model="firstName"
                    class="input"
                    type="text"
                    :class="validate('firstName') && 'is-success'"
                    placeholder="Enter first name..."
                  />
                  <p class="help is-danger" v-if="validate('firstName')">Invalid data</p>
                </div>
              </div>
              <div class="field column">
                <label class="label">Last Name</label>
                <div class="control">
                  <input
                    v-model="lastName"
                    class="input"
                    :class="validate('lastName') && 'is-success'"
                    type="text"
                    placeholder="Enter last name..."
                  />
                </div>
                <p class="help is-danger" v-if="validate('lastName')">Invalid data</p>
              </div>
            </div>

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
                <p class="help is-danger" v-if="validate('email')">Invalid data</p>
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
                <p class="help is-danger" v-if="validate('password')">Invalid data</p>
              </div>
            </div>

            <div class="field">
              <label class="label">Repeat Password</label>
              <div class="control">
                <input
                  v-model="repeatPassword"
                  class="input"
                  type="password"
                  :class="validate('repeatPassword') && 'is-success'"
                  placeholder="Enter password..."
                />
                <p class="help is-danger" v-if="validate('repeatPassword')">Invalid data</p>
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
      <button class="modal-close is-large" aria-label="close" @click="close" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const initialState = () => ({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  repeatPassword: null,
  submitted:false
});

export default {
  data() {
    return initialState();
  },
  computed: {
    open() {
      return this.$store.state.misc.registerModal;
    },
    isLoggedIn() {
      return this.$store.state.account.user;
    }
  },
  methods: {
    ...mapActions(["account/register"]),
    close() {
      this.$store.commit("misc/toggleRegister");
    },
    reset() {
      Object.assign(this.$data, initialState());
    },
    onSubmit() {

      this.submitted = true;
      if(this.validate()) {
        return false;
      }

      const creds = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      };

      this.$store.dispatch("account/register", creds).then(() => {
        if (this.$store.state.account.success) {
          this.reset();
        }
      });
    },
    resetNotification() {
      this.$store.dispatch("account/reset", "error");
      this.$store.dispatch("account/reset", "success");
    },
    validate(type = null) {
      if(!this.submitted){
        return false;
      }

      if (!type) {
        return (
          !this.lastName ||
          !this.firstName ||
          !this.email ||
          !this.password ||
          !this.repeatPassword
        );
      }

      return !this[type];
    }
  }
};
</script>
