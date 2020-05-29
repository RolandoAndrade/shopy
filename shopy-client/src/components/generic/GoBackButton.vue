<template>
   <v-btn class="ma-2" color="purple" icon v-on:click="() => this.$router.back()">
         <v-icon x-large>mdi-arrow-left</v-icon>
   </v-btn>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import Vue from 'vue';

@Component({
  
})
export default class GoBackButton extends Vue {
}
</script>

<style>

</style>