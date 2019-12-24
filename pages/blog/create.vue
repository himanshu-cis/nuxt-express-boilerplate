<template>
  <div class="container">
    <div class="flex">
      <div class="w-full">
        <h1 class="title">
          Create 
        </h1>
      </div>
    </div>
    <div class="flex text-left">
      <div class="w-full bg-white p-5 ml-10 border">
        <form class="review-form" @submit.prevent="onSubmit">
          <div class="field">
            <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">Title</label>
            <div class="control">
              <input v-model="title" 
              class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" 
              :class="{'border-red-500': error ==='title'}"
              placeholder="Enter blog title...">
            </div>
            <p class="text-red-500 text-xs italic" v-if="error ==='title'">Please enter a title</p>

          </div>

          <div class="field">
            <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">Content</label>
            <div class="control">
              <vue-editor v-model="content"></vue-editor>
              <p class="text-red-500 text-xs italic" v-if="error ==='content'">Please enter some content</p>
            </div>
          </div>

          <div class="field">
            <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">Tags</label>
            <div class="control">
              <input v-model="tags" class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" type="text" placeholder="Enter blog tags (comma seperated)...">
            </div>
          </div>

          <div class="field is-grouped">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline">
                Create
              </button>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
              </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";

export default {
  components:{
    VueEditor
  },
  data () {
    return {
      title: null,
      content: null,
      tags: null,
      error: ''
    }
  },
  methods: {
    onSubmit () {
      const blog = {
        title: this.title,
        content: this.content,
        tags: this.tags,
      }

      if(!this.title || this.title === '') {
        this.error = 'title';
        return false;
      } 
      
      if(!this.content || this.content === '' ) {
        this.error = 'content';
        return false;
      }

      this.title = null
      this.content = null
      this.tags = null

      this.$store.dispatch('blogs/add', blog)
      this.$router.push('/')
    }
  }
}
</script>
