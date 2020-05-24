<template>
    <div class="flex to-column padding-medium">
        <div class="half" style="text-align:center">
        <img src="../../assets/Hero-image.jpg" style="width:100%;" />
        </div>
        <div class="column half padding-small">
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
            <v-row class="justify-end">
            <ButtonPrimary  @click.native="signIn">
                {{ this.$language.get('home.hero.btn-sign-in')}}
            </ButtonPrimary>
            </v-row>
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
