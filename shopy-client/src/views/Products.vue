<template>
<div>
    <v-row no-gutters v-if="render">
            <v-col :cols="3" >
                <SideNavDrawer>
                        <ProductFilter :items="items"/>
                </SideNavDrawer>      
            </v-col>

          
            <v-col :cols="9" >
                <ProductCard/>
            </v-col>
                                
    </v-row>
    <v-row v-else >
        <div class="width-cover">
         <ProductFilter :items="items"/>
        </div>
          <ProductCard/>
        
    </v-row>
</div>
</template>

<script lang="ts">

import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import ProductCard from '@/components/cards/ProductCard.vue'
import SideNavDrawer from '@/components/layout/menus/SideNavDrawer.vue';
import ProductFilter from '@/components/products/ProductFilter.vue';
import {ProductFilteri} from '../interfaces/productFilter.interface'
@Component({
    components:{
        ProductCard,
        SideNavDrawer,
        ProductFilter
    }
})
export default class Products extends Vue{
  
    private render! : boolean;
    private windowSize: number = 0;
  
     private items : ProductFilteri[] = [
    
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

    private verifySreenSize(screenWidth : any): boolean{
             
       if (screenWidth <= 600) return false;
       else return true;
    }

    beforeMount(){
       console.log('actualizada');
      this.render = this.verifySreenSize(screen.width);
      
    }

      @Watch('windowSize') 
            windowHeight() {
                if (this.verifySreenSize(this.windowSize) !== this.render){
                    this.$router.go(0);
                }
            }
     

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  }

  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  }

  onResize() {
    this.windowSize = screen.width;
    console.log(this.windowSize);
  }


} 
</script>

<style lang="scss">

</style>