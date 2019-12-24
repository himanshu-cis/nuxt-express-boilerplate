<template>
  <div class="container">
    <div class="flex mb-4">
      <div class="w-full">
        <h1 class="title">
          Blogs
        </h1>
        <nuxt-link v-if="$auth.loggedIn" to="/blog/create" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Add new
        </nuxt-link>
        </div>
    </div>
    <div class="flex flex-wrap">
        <div class="w-full" v-for="(blog, index) in blogs" :key="index">
         <nuxt-link :to="{ name: 'blog-id', params: { id:blog._id }}" exact>
         <div class="flex flex-warp text-left border-b border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2">
          <div class="w-100 text-center">
            <img class="w-20 mr-4" src="https://bulma.io/images/placeholders/128x128.png" alt="Avatar of Jonathan Reinink">
          </div>
          <div class="flex flex-col justify-between leading-normal">
      
            <div class="mb-2">
              <div class="text-gray-900 font-bold text-xl mb-2">{{ blog.title }}</div>
              <div class="text-sm">
                <p class="text-gray-900 leading-none">{{ blog.createdBy.firstName }} {{ blog.createdBy.lastName }}</p>
                <p class="text-gray-600 text-xs">{{ blog.createdAt }}</p>
              </div>
            </div>
            <div class="flex items-center">
            </div>
          </div>
          </div>
          </nuxt-link>
        </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    blogs () {
      return this.$store.state.blogs.list
    }
  },
  methods: {
    ...mapMutations({
      toggle: 'blogs/toggle'
    })
  },
  created() {
    this.$store.dispatch('blogs/get');
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
