<template>
  
    <v-footer color="purple" padless class="size">
        <v-row justify="center" no-gutters>

                <v-btn
                    v-for="link in footerLinks"
                    :key="link"
                    color="white"
                    text
                    rounded
                    class="my-2"
                >
                    {{ link }}
                </v-btn>
            
            <transition name="fade">
                <v-col
                class="purple py-4 text-center white--text title-center"
                cols="12"
                >
                      <v-menu open-on-hover top offset-y class="margin-medium">
                            <template v-slot:activator="{ on }">
                               
                                <v-btn color="purple" dark v-on="on">
                                     <v-icon class="small-icon mr-2" color="white">mdi-earth</v-icon>
                                   {{activeLan}}
                                     <v-icon class="small-icon" color="white">mdi-chevron-down</v-icon>

                                </v-btn>
                            </template>
  
                            <v-list>
                                <v-list-item
                                    v-for="(item, index) in languages"
                                    :key="index"
                                    @click=""
                                >
                                    <v-list-item-title>{{ item }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                     </v-menu>
                    
                </v-col>
            </transition>
        </v-row>
    </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class Footer extends Vue{
    public  footerLinks: Array<string> =[
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
    ];

     public languages: Array<String>=['EN','ES','ITA','FR']
      public activeLan: string = 'EN';
}
</script>

<style>

</style>