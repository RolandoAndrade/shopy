<template>
    <div class="bg-white padding-medium">
        <Title :size="'title-secondary'">Our categories</Title>
        <v-carousel height="max-content" hide-delimiter-background >
            <v-carousel-item  v-for="(slide, i) in categories" :key="i" >
                <v-sheet color="white" height="100%" class="padding-medium">
                        <div class="flex wrap">

                           <HomeCard v-for="(cat, ind) in slide.x" :key="ind" 
                                 :type="'card-categories'"
                                 :title="cat.title"
                                 :icon="cat.icon" 
                                />
                        </div>
                 </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import HomeCard from '../cards/HomeCard.vue';
import Title from '../typography/Title.vue';
@Component({
    components:{
        HomeCard,
        Title
    }
})
export default class Carrousel extends Vue{

    public categories: Object = [
         {
             x: [{title:'Animales y mascotas',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                  {title:'Vehiculos',icon:'icon-gift'},
                   {title:'Vehiculos',icon:'icon-gift'}
                 ]
         },
          {x:    [{title:'Animales y mascotas',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                 {title:'Vehiculos',icon:'icon-gift'},
                  {title:'Vehiculos',icon:'icon-gift'},
                   {title:'Vehiculos',icon:'icon-gift'}
                 ]},
      ]
    

}
</script>

</style>