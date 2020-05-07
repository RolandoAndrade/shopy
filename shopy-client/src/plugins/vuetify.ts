import Vue from 'vue';

import es from 'vuetify/src/locale/es';
import Vuetify from "vuetify";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                purple: '#442464',
                purple2: '#e2c6e7',
                white: '#fff',
                orange: '#fa8c73',
                black:  "#333",
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            }
        }
    },
    lang: {
        locales: { es },
        current: 'es'
    }
});
