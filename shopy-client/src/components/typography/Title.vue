<template>
    <div :class="getClass()"><slot></slot></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

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
