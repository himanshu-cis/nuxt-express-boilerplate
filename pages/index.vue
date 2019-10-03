<template>
  <div class="section">
    <div class="hero">
      <div class="hero-body">
        <h1 class="title">
          Blogs
        </h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <nuxt-link to="/blog/create" class="button is-link">
          Add new
        </nuxt-link>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <div v-for="(blog, index) in blogs" :key="index" class="box">
          <nuxt-link :to="{ name: 'blog-id', params: { id:blog.id }}" exact>
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ blog.createdBy }}</strong>
                    <small>{{ blog.createdAt }}</small>
                    <br>
                    {{ blog.title }}
                  </p>
                </div>
              </div>
            </article>
          </nuxt-link>
        </div>
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
