<template>
    <div>                
        <template  >
          <v-list-item two-line class="text-center">
                <v-list-item-content>
                    <v-list-item-title class="title-terciary">Product Name</v-list-item-title>
                    <v-list-item-subtitle>23234 results</v-list-item-subtitle>
                </v-list-item-content>
          </v-list-item>
        </template>
  
        <v-divider></v-divider>
  
        <v-list dense>

            <template v-for="(item, k) in items">
               
                <v-list-group v-if="item.parent" v-model="item.open"
                              
                              class="ma-1" :key="k">

                    <template v-slot:appendIcon>
                        <v-list-item-title class="ma-1 pa-1">
                                        {{ item.name }}
                          </v-list-item-title>
                          <v-spacer></v-spacer>
                        <v-icon small >{{item.openIcon}}</v-icon>
                    </template>
                    <template v-if="item.children">
                            <v-list-item  v-for="(child, i) in item.children" :key="i" link  >
                                <v-list-item-action v-if="child.icon" class="mr-0">
                                    <v-icon class="icon-small">{{ child.icon }}</v-icon>
                                </v-list-item-action>

                                <v-list-item-content v-if="child.name" class="pa-0 ma-0" >
                                    <v-list-item-title class="pa-2">
                                        {{ child.name }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                    </template>
                    <template v-else-if="item.rating">
                             <v-list-item  v-for="(child, i) in item.rating" :key="i" link class="ml-4" >
                                    <Icon v-for="n in child" :key="n" 
                                          :size="'icon-small'" 
                                          :color="'orange-i'"
                                          :icon="'icon-star-full'" 
                                          class="mr-1"/>
                             </v-list-item>
                    </template>
                
                </v-list-group>

                <v-list-item v-else :key="item.text" link class="ma-1">
                            <v-list-item-action>
                                <v-icon class="icon-small">{{ item.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title class="pa-1">
                                    {{ item.name }}
                                </v-list-item-title>
                            </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>  
    </div>  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Icon from '@/components/typography/Icon.vue';
import {ProductFilterInterface} from "@/interfaces/productFilter.interface";

@Component({
    components:{
        Icon
    }
})
export default class ProductFilter extends Vue{

    @Prop() items! : Array<ProductFilterInterface>;

}
</script>

<style>

</style>