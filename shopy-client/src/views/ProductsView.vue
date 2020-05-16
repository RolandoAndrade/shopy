<template>
<div>
    <v-row no-gutters v-if="isShow">
            <v-col :cols="3" >
                <SideNavDrawer>
                        <ProductFilter :items="items"/>
                </SideNavDrawer>      
            </v-col>
            <v-col :cols="9" >
                <ProductsCatalog/>
            </v-col>                              
    </v-row>
    <v-row v-else >
        <div class="width-cover">
            <ProductFilter :items="items"/>
        </div>
        <ProductsCatalog/>
    </v-row>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import ProductsCatalog from '@/components/cards/ProductsCatalog.vue'
import SideNavDrawer from '@/components/layout/menus/SideNavDrawer.vue';
import ProductFilter from '@/components/products/ProductFilter.vue';
import {ProductFilterInterface} from '@/interfaces/productFilter.interface'
@Component({
    components:{
        ProductsCatalog,
        SideNavDrawer,
        ProductFilter
    }
})
export default class ProductsView extends Vue{
  
    private render! : boolean;
    private windowSize: number = 0;
  
     private items : ProductFilterInterface[] = [

        {id:1,name: 'Categories', parent: true,open: false,openIcon: "mdi-chevron-down",
                            children: [
                                { icon: "mdi-paw", id:2,name: "Animales y mascotas" },
                                { icon: "mdi-car-side", id:3,name: "Vehiculos" },
                                { icon: "mdi-home-group", id:4,name: "Inmuebles" }
                            ]},
        {id:5,name: 'Condition', parent: true,open: false,openIcon: "mdi-chevron-down",
                            children: [
                                {id:6,name: "Nuevo" },
                                { id:7,name: "Usado" }
                            ]},
        {id:8,name: 'Rating', parent: true,open: false,openIcon: "mdi-chevron-down",
                            rating: [5,4,3,2,1]}
      ];


     get isShow(){
         return !this.$vuetify.breakpoint.smAndDown;
     }


} 
</script>

<style lang="scss">

</style>