<template>
    <div>
        <Header />

        <div class="push-footer">
            <v-fade-transition hide-on-leave>
                <v-content>
                    <slot></slot>
                </v-content>
            </v-fade-transition>
        </div>

        <Footer />
    </div>
</template>

<script lang="ts">
import Footer from '@/components/layout/general/Footer.vue';
import Header from '@/components/layout/general/Header.vue';
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
    components: {
        Footer,
        Header
    }
})
export default class Layout extends Vue {
    public navLinks: Record<string, any> = [
        { title: 'Categories', icon: 'mdi-apps' },
        { title: 'My products', icon: 'mdi-clipboard-text-outline' },
        { title: 'My shopping', icon: 'mdi-cash-usd-outline' },
        { title: 'Log Out', icon: 'mdi-logout' }
    ];
}
</script>

<style>
.push-footer {
    min-height: calc(100vh - 120px);
}
</style>
