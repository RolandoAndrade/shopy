<template>
     <div class="flex wrap padding-medium">           
            <HomeCard v-for="(item,k) in items" :key="k" 
                        :title="item.title" 
                        :icon="item.icon"
                        :type="'card-us margin-medium'"/> 
     </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HomeCard from './HomeCard.vue';

@Component({
    components:{
        HomeCard
    }
})
export default class CardContainer extends Vue{

    @Prop() items! : Object;
}
</script>

<style>

</style>