<template>
  <div class="section" style="background: rgba(204, 204, 204, 0.28);">
    <div class="columns is-centered">
      <div
        class="column is-half"
        style="background:#fff; border: 1px solid #ccc;min-height: 100vh;padding:2em"
        v-if="blog"
      >
        <div class="hero">
          <hero class="body">
            <h3 class="subtitle">{{ blog.title }}</h3>
          </hero>
          <small class="level">
            <span class="level-left">
              Added&nbsp;<strong v-if="blog.createdBy">by {{ blog.createdBy.firstName }} {{ blog.createdBy.lastName }}</strong>&nbsp;on {{ blog.createdAt }}
            </span>
            <span class="level-right" v-if="blog.tags.length">
              <strong>Tagged under:</strong>
              {{ blog.tags.join(', ') }}
            </span>
          </small>
        </div>
        <hr />
        <p class="is-size-5">{{ blog.content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  validate({ params }) {
    return params.id;
  },
  computed: {
    blog() {
      const { list } = this.$store.state.blogs;
      let article = list.filter(blog => blog._id === this.$route.params.id)[0];

      if (!article) {
        this.$store.dispatch("blogs/get", {
          id: this.$route.params.id
        });
      } else {
        return article;
      }
    }
  }
};
</script>
