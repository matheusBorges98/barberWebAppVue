// import Vue from 'vue';
// import VueResource from 'vue-resource'

// Vue.use(VueResource)

// const http = Vue.http

// http.options.root = "http://localhost:3333/"

// export { http }

import Vue from 'vue';
import VueResource from 'vue-resource'

Vue.use(VueResource)

const http = Vue.http

http.options.root = "http://143.198.70.219"

export { http }