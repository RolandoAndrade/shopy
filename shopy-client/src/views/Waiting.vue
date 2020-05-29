<template>
    <section class="section-book">
        <div class="book__signup">
            <Title size="title-secondary-big" class="pa-10"
                >Shopy is processing your payment</Title
            >
            <Loader />
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Title from '@/components/typography/Title.vue';
import Loader from '@/components/generic/Loader.vue';
@Component({
    components: {
        Title,
        Loader
    }
})
export default class Waiting extends Vue {}
</script>

<style></style>
