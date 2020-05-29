<template>
    <div :class="getClass()"><slot></slot></div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';

@Component({})
export default class Title extends Vue {
    @Prop({})
    private size!: string;
    @Prop() private color?: string;

    private getClass(): string {
        return 'title-center ' + this.size + ' ' + this.color;
    }
}
</script>

<style lang="scss"></style>
