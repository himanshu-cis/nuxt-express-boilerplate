<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-three-fourth">
          <div class="hero">
            <hero class="body">
              <h3 class="subtitle">
                {{ blog.title }}
              </h3>
            </hero>
            <p><strong>{{ blog.createdBy }}</strong> on {{ blog.createdAt }} </p>
            <p><strong>Tagged under:</strong> {{ blog.tags.join(', ') }}</p>
            <p>{{ blog.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  computed: {
    blog () {
      const { list } = this.$store.state.blogs
      return list.filter(blog => blog.id === this.$route.params.id)[0]
    }
  }
}
</script>
