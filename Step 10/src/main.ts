import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize.min.js'
import '../src/assets/css/index.css'
import '../src/assets/css/materialdesignicons.min.css'

// Import OnsenUI stylesheets.
import "onsenui/css/onsen-css-components.css";
import "onsenui/css/onsenui.css";

// Import our core Vue module as well as our custom router.
import VueOnsen from "vue-onsenui";

import moment from "vue-moment";

Vue.use(moment);

// Bind OnsenUI to Vue.
Vue.use(VueOnsen);

Vue.config.productionTip = false



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
