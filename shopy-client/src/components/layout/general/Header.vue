<template>
  <v-app-bar app color="purple" class="pa-0">
        <div class="cover space-between ">
          <div class="inline">
        
            <img class="logo" src="@/assets/logo.png" @click="()=>this.$router.push('/')"/>
            <Title :size="'title-secondary'" :color="'title-white'">Shopy</Title>
          </div>
                <SearchBar/>
                
             <v-menu :close-on-content-click="false"
                      offset-x
                      offset-y>

                    <template v-slot:activator="{ on }">
                        <v-btn icon class="mr-2" v-on="on">
                            <v-icon large color="purple2" >mdi-menu</v-icon>
                        </v-btn> 
                    </template>

                    <v-card width="300">
                        <v-list v-if="login">
                            <v-list-item>
                                <v-list-item-avatar>
                                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                                </v-list-item-avatar>
                    
                                <v-list-item-content>
                                    <v-list-item-title>Stephanie Cruz</v-list-item-title>
                                    <v-list-item-subtitle>scruz.17@est.ucab.edu.ve</v-list-item-subtitle>
                                </v-list-item-content>
                    
                                <v-list-item-action>
                                    <v-btn color="orange" icon >
                                        <v-icon large> mdi-cart-outline</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                
                        <v-divider v-if="login"></v-divider>
                            
                        <v-list dense nav>
                            <v-list-item v-for="item in navLinks" :key="item.title"  link :to="item.link">
                                <v-list-item-icon>
                                    <v-icon class="icon-small">{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                    
                                <v-list-item-content>
                                    <v-list-item-title class="py-2">{{ item.title }}</v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                            
                        </v-list>


                       
                    </v-card>
              </v-menu>
        </div>
    </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '@/components/typography/Title.vue';
import SearchBar from '@/components/generic/SearchBar.vue';


@Component({
    components:{
        Title,
        SearchBar
    }
})
export default class Header extends Vue{
    
    private login : boolean = true;
    private navLinks : {title: string, icon: string, link?: string}[] = [
        {title:'categories',icon:'mdi-apps', link:'/products'},
        {title:'my products',icon:'mdi-bulletin-board'},
        {title:'my shopping',icon:'mdi-cash'},
        {title:'log in',icon:'mdi-login'},
        {title:'log out',icon:'mdi-logout'}
    ]
}
</script>

<style>

</style>