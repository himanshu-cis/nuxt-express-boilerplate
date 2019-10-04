export const state = () => ({
  list: [{
    id: 1,
    title: 'A Sample blog post',
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    createdAt: new Date(),
    createdBy: 'Himanshu S',
    tags: ['sample', 'demo']
  }]
})

export const mutations = {
  get(state, data) {
    if(Array.isArray(data)) {
      state.list = [
        ...data
      ];
    } else {
      state.list.push(data)
    }
  },
  add (state, data) {
    state.list.push(data)
  },
  remove (state, { blog }) {
    state.list.splice(state.list.indexOf(blog), 1)
  },
  toggle (state, blog) {
    blog.done = !blog.done
  }
}

export const actions = {
  get({commit}, data) {
    return this.$axios.$get('/api/blog', {
      params: data
    })
      .then(response => {
        if(response.status) {
          commit('get', response.payload)
        }
      })
  },
  add({commit}, data) {
    return this.$axios.$post('/api/blog/', data)
      .then(response => {
        if(response.status) {
          console.log("TCL: add -> response.payload", response.payload)
          commit('add', response.payload);
        }
      });
  }
}
