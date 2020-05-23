<template>
    <div class="banner flex">
        <img src="../../assets/Hero-image.jpg" />
        <div class="flex column padding-medium ">
            <Title :size="'title-primary'">{{
                this.$language.get('home.hero.title')
            }}</Title>
            <div class="divider" />
            <Title
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                enim quibusdam fugiat sapiente dignissimos necessitatibus,
                repellendus facilis numquam impedit, est in sed atque ut
                inventore alias velit ipsa cupiditate culpa?</Title
            >
            <ButtonPrimary class="end" @click.native="signIn">
                {{ this.$language.get('home.hero.btn-sign-in')}}
            </ButtonPrimary>
        </div>
    </div>
</template>

<script lang="ts">
import Title from '../typography/Title.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
    components: {
        Title,
        ButtonPrimary
    }
})
export default class Hero extends Vue {
    signIn() {
        this.$router.push('/login');
    }
}
</script>

<style scoped lang="scss"></style>
