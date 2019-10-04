import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _d56dfc1a = () => interopDefault(import('../pages/blog/create.vue' /* webpackChunkName: "pages/blog/create" */))
const _0562c15a = () => interopDefault(import('../pages/blog/_id.vue' /* webpackChunkName: "pages/blog/_id" */))
const _2ae88bbc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog/create",
    component: _d56dfc1a,
    name: "blog-create"
  }, {
    path: "/blog/:id?",
    component: _0562c15a,
    name: "blog-id"
  }, {
    path: "/",
    component: _2ae88bbc,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
