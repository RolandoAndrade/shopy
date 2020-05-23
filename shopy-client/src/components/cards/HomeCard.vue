<template>
    <div :class="getClass()">
        <!-- <Icon :icon="icon" :size="'icon-big'"/> -->
        <slot></slot>
        <Title :size="'title-terciary'">{{ title }}</Title>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Title from '../typography/Title.vue';
import Vue from 'vue';

@Component({
    components: {
        Title
        // Icon
    }
})
export default class HomeCard extends Vue {
    @Prop({ required: false, type: String, default: '' }) title?: string;
    @Prop() icon?: string;
    @Prop() type!: string;

    private getClass(): string {
        return 'card ' + this.type;
    }
}
</script>

<style>
.prueb {
    height: 15rem;
}
</style>
