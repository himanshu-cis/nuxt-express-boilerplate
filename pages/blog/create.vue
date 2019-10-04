<template>
  <div class="section">
    <div class="columns">
      <div class="column is-full">
        <div class="hero">
          <div class="hero-body">
            <h1 class="title">
              Create a new blog
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <form class="review-form" @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input v-model="title" class="input" type="text" placeholder="Enter blog title...">
            </div>
          </div>

          <div class="field">
            <label class="label">Content</label>
            <div class="control">
              <textarea v-model="content" class="textarea" placeholder="Textarea" />
            </div>
          </div>

          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input v-model="tags" class="input" type="text" placeholder="Enter blog tags (comma seperated)...">
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">
                Add
              </button>
            </div>
            <div class="control">
              <button class="button is-text">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      title: null,
      content: null,
      tags: null
    }
  },
  methods: {
    onSubmit () {
      const blog = {
        title: this.title,
        content: this.content,
        tags: this.tags,
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
