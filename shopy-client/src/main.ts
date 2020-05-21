import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import { LanguagePlugin } from '@/plugins/languages/language';

Vue.use(Vuelidate);
Vue.use(LanguagePlugin);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    created() {
        // firebase.initializeApp(firebaseConfig);
    },
    render: h => h(App)
}).$mount('#app');
