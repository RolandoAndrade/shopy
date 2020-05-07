<template>
    <div class="home">
        <div class="hero bg-white">
               <Hero/>
        </div>  
        <CardContainer :items="homeItems" />
        <Carrousel/>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src

import { Component, Prop, Vue } from 'vue-property-decorator';
import CardContainer from '../components/cards/CardContainer.vue';
import Hero from '../components/layout/Hero.vue';
import Title from '../components/typography/Title.vue';
import Carrousel from '../components/categories/Carrousel.vue';

@Component({
    components:{
        CardContainer,
        Hero,
        Title,
        Carrousel
    }
})
export default class Home extends Vue{

    public homeItems: Object =[{title:'Secure payments',icon:'icon-credit-card'},
                                {title:'Give the best gifts',icon:'icon-gift'},
                                {title:'5 languages available',icon:'icon-sphere'},
                                {title:'Sell for free',icon:'icon-banknote'}];

}
</script>

<style scoped>
   img{
       height: 100%;
   }
    
</style>