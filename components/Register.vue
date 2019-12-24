<template>
<div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center" :class="{ 'opacity-0': !open }" v-if="open">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" @click="close">
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">

        <!--Body-->
           <form class="review-form" @submit.prevent="onSubmit">
            <div class="columns">
              <div class="field column">
                <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">First Name</label>
                <div class="control">
                  <input
                    v-model="firstName"
                    class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    type="text"
                    :class="validate('firstName') && 'border-red-500'"
                    placeholder="Enter first name..."
                  />
                  <p class="text-red-500 text-xs italic" v-if="validate('firstName')">Invalid data</p>
                </div>
              </div>
              <div class="field column">
                <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">Last Name</label>
                <div class="control">
                  <input
                    v-model="lastName"
                    class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                    :class="validate('lastName') && 'border-red-500'"
                    type="text"
                    placeholder="Enter last name..."
                  />
                </div>
                <p class="text-red-500 text-xs italic" v-if="validate('lastName')">Invalid data</p>
              </div>
            </div>

            <div class="field">
              <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  :class="validate('email') && 'border-red-500'"
                  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="email"
                  placeholder="Enter email..."
                />
                <p class="text-red-500 text-xs italic" v-if="validate('email')">Invalid data</p>
              </div>
            </div>

            <div class="field">
              <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  :class="validate('password') && 'border-red-500'"
                  type="password"
                  placeholder="Enter password..."
                />
                <p class="text-red-500 text-xs italic" v-if="validate('password')">Invalid data</p>
              </div>
            </div>

            <div class="field">
              <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">Repeat Password</label>
              <div class="control">
                <input
                  v-model="repeatPassword"
                  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="password"
                  :class="validate('repeatPassword') && 'border-red-500'"
                  placeholder="Enter password..."
                />
                <p class="text-red-500 text-xs italic" v-if="validate('repeatPassword')">Invalid data</p>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" :disabled="validate()">Register</button>
              </div>
            </div>
          </form>
      </div>
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
