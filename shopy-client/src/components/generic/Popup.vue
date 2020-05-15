<template>
  <v-dialog max-width="300px" v-model="dialog">
      <v-card class="flex column">
          <Title :size="'title-terciary'" class="mt-4">{{typeMessage}}</Title>
          <Icon :icon="icon" :size="'icon-big'" class="mt-6 mb-8" :color="color"/>
          <Title :size="'title-terciary'" class="mb-4">{{message}}</Title>
      </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Icon from '@/components/typography/Icon.vue';
import Title from '@/components/typography/Title.vue';

@Component({
    components:{
        Icon,
        Title
    }
})
export default class Popup extends Vue {

    @Prop() dialog! :boolean;
    @Prop() message! : string;
    @Prop() response! :boolean;

    private icon? : string;
    private color? : string;
    private typeMessage? :string;


    created() {
        if (this.response){
           this.icon='icon-checkmark2';
           this.color='success-i';
           this.typeMessage='Good!'
        }else {
           this.icon='icon-x-circle';
           this.color='error-i';
           this.typeMessage='Oh no, there was an error...'
        }
    }


    
}
</script>

<style>

</style>