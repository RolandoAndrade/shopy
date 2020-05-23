<template>
    <v-app>
        <Layout>
            <v-fade-transition>
                <router-view />
            </v-fade-transition>
        </Layout>
    </v-app>
</template>

<script lang="ts">
import Layout from './components/layout/Layout.vue';
import Vue from 'vue';

export default Vue.extend({
    name: 'App',

    components: {
        Layout
    },

    data: () => ({
        //
    })
});
</script>

<style lang="scss">
@import '@/styles/main.scss';
</style>
