<template>
<div>
      
    <Header/>  

        <v-fade-transition hide-on-leave>
            <v-content >
                <slot ></slot>
            </v-content>
        </v-fade-transition>

    <Footer/>

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Footer from '@/components/layout/general/Footer.vue';
import Header from '@/components/layout/general/Header.vue';

@Component({
    components:{
        Footer,
        Header
    }
})
export default class Layout extends Vue{

      public navLinks: Object =[
        { title: 'Categories', icon: 'mdi-apps' },
        { title: 'My products', icon: 'mdi-clipboard-text-outline' },
        { title: 'My shopping', icon: 'mdi-cash-usd-outline' },
        { title: 'Log Out', icon: 'mdi-logout' }];
}
</script>

<style>

</style>