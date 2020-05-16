<template>
<div >

 <div style="height:350px" v-if="e6 === 0">
     <div class="pulsate flex"  v-on:click="e6++">
         Get start!
     </div>
 </div>
 <v-stepper v-model="e6" vertical >

    <v-stepper-step :complete="e6 > 1" step="1" color="purple">
           <Title :size="'title-secondary'" class="mt-6">Select the category of your product </Title>
            <Title :size="'title-terciary'" class="mt-4">You can add as many as you want!</Title>
    </v-stepper-step>

        <v-stepper-content step="1" color="purple" class="column">
            <SelectCategories v-on:nextStep="getCategories" v-on:goBack="$router.push('/products')"/>
        </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2" color="purple">
         <Title :size="'title-secondary'">Tell us about your product </Title>
    </v-stepper-step>

        <v-stepper-content step="2">
            <SelectInfo v-on:nextStep="getProducts" v-on:goBack="e6--"/>
        </v-stepper-content>

    <v-stepper-step  step="3" color="purple">
         <Title :size="'title-secondary'">Give us some images of your product!</Title>
    </v-stepper-step>

        <v-stepper-content step="3">
            <AddImages v-on:nextStep="getImages" v-on:goBack="e6--"/>
        </v-stepper-content>  

 </v-stepper>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import SelectCategories from '@/components/products/create-product/SelectCategories.vue';
import SelectInfo from '@/components/products/create-product/SelectInfo.vue';
import AddImages from '@/components/products/create-product/AddImages.vue';
import Title from '@/components/typography/Title.vue';
import Icon from '@/components/typography/Icon.vue';
import {Product} from '../interfaces/product.interface';

@Component({
    components:{
        ButtonSecondary,
        SelectCategories,
        SelectInfo,
        AddImages,
        Title,
        Icon
    }
})
export default class AddProduct extends Vue{

    private images : Array<File>=[];
    private categories : Array<object> =[];
    private e6 : number = 0;
    private product! :Product;

    private nextStep(){
        this.e6++;
    }

    private getProducts(product: Product){
        this.product=product;
        this.nextStep();
    }

    private getImages(images: Array<File>){
        this.images=images;
    }
   
    private getCategories(categories: Array<object>,category: string){
        this.categories=categories;
        console.log(categories, category);
        this.nextStep();
    }
}
</script>

<style>
.white{
    color:white;
}
.v-stepper{
    font-size: 7rem !important;
}
.v-select__selection, .v-label--active{
    font-size: 2rem !important;
}
.v-list-item__title,.v-select__selection{
    padding:4px;
}
.v-label ,input{
     font-size: 1.5rem !important;
}
.v-input__slot{
    padding-bottom:0px;
}
.v-input{
    padding: 0;
    
}
.text-area{
    width:10rem !important;
}
.prof{
    width: 50%;
}

</style>