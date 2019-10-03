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
  add (state, { title, content, tags, createdBy, id }) {
    state.list.push({
      id: Number(state.list.length) + 1,
      title,
      content,
      createdAt: new Date(),
      createdBy,
      tags
    })
  },
  remove (state, { blog }) {
    state.list.splice(state.list.indexOf(blog), 1)
  },
  toggle (state, blog) {
    blog.done = !blog.done
  }
}
