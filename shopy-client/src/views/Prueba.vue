<template>
  <div v-if="render">
        HOLA CONO
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Icon extends Vue{
    public render : boolean = true;
} 
</script>

<style>

</style>