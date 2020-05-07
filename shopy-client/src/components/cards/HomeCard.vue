<template>
            <div :class="getClass()">
                    <svg class="icon">
                        <use :xlink:href="require('@/assets/symbol-defs.svg')+'#'+icon"></use>  
                    </svg>
                    <Title :size="'title-terciary'">{{title}}</Title>
            </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '../typography/Title.vue';

@Component({
    components:{
        Title
    }
})
export default class HomeCard extends Vue{

    @Prop({required:false, type: String, default: ""})  title?:string;
    @Prop() icon? : string;
    @Prop() type! : string;

    private getClass() : string {
        return 'card '+ this.type
    }
}
</script>

<style>

</style>