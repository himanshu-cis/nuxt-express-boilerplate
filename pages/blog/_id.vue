<template>
  <div class="flex content-center">
      <div
        class="w-1/2 ml-auto mr-auto mt-10 bg-white p-10 border"
        v-if="blog"
      >
        <div class="hero">
          <hero class="body">
            <h3 class="subtitle">{{ blog.title }}</h3>
          </hero>
          <small class="level text-gray-500">
            <span class="level-left">
              Added&nbsp;<strong v-if="blog.createdBy">by {{ blog.createdBy.firstName }} {{ blog.createdBy.lastName }}</strong>&nbsp;on {{ blog.createdAt }}
            </span>
            <span class="level-right" v-if="blog.tags.length">
              <strong>Tagged under:&nbsp;</strong>
              {{ blog.tags.join(', ') }}
            </span>
          </small>
        </div>
        <hr />
        <p class="is-size-5 mt-4 text-gray-800" v-html="blog.content"></p>
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
<style>
  body{
    background: rgba(204, 204, 204, 0.35);
  }
</style>
