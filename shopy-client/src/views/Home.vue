<template>
    <div class="home" style="height:100% !important;">
        <div class="hero bg-white">
            <Hero />
        </div>
        <CardContainer :items="homeItems" />
        <Carrousel />
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import CardContainer from '../components/cards/CardContainer.vue';
import Hero from '../components/layout/Hero.vue';
import Title from '../components/typography/Title.vue';
import Carrousel from '../components/categories/Carrousel.vue';
import Vue from 'vue';

@Component({
    components: {
        CardContainer,
        Hero,
        Title,
        Carrousel
    }
})
export default class Home extends Vue {
    public homeItems: Record<string, any> = [
        { title: 'Give the best gifts', icon: 'home1.png' },
        { title: 'Secure payments', icon: 'home2.png' },
        { title: '5 languages available', icon: 'home3.png' },
        { title: 'Sell for free', icon: 'home4.png' }
    ];
}
</script>

<style scoped>
img {
    height: 100%;
}
</style>
