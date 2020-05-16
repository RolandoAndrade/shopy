<template>
    <svg :class="getClass" >
        <use :xlink:href="require('@/assets/symbol-defs.svg')+'#'+icon"></use>  
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class Icon extends Vue{
    @Prop() icon! : string;
    @Prop() size! : string;
    @Prop() color? : string;

    get getClass(){   
        
        return this.size + ' '+this.color ;
    }
}
</script>

<style>
</style>