<template>
   <div class="banner flex">
        <img src="../../assets/Hero-image.jpg"/>
        <div class="flex column padding-medium ">
            <Title :size="'title-primary'">Welcome to Shopy</Title>
            <div class="divider"/>
            <Title>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque enim quibusdam fugiat sapiente dignissimos necessitatibus, repellendus facilis numquam impedit, est in sed atque ut inventore alias velit ipsa cupiditate culpa?</Title>
            <ButtonPrimary class="end"  @click.native="()=>$router.push('/login')">
                Sign In
            </ButtonPrimary>
        </div>
  </div>
</template>


<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import Title from '../typography/Title.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';

@Component({
    components:{
        Title,
        ButtonPrimary
    }
})
export default class Hero extends Vue{


}
</script>

<style scoped lang="scss">


</style>