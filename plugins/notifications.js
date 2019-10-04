import Vue from 'vue'
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css'; // or dark.css or simple.css

export default ({ app }, inject) => {
    Vue.use(Snotify);
}
