<template>
    <v-app> 
        <Layout>
            <router-view/>
        </Layout>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from './components/layout/Layout.vue';

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
@import "@/styles/main.scss";

</style>