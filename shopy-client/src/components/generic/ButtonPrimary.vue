<template>
    <v-btn :class="getClass()">
        <div class="button__text button-text">
            <slot />
        </div>
    </v-btn>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class ButtonPrimary extends Vue {
    @Prop() color?: string;

    private getClass(): string {
        if (this.color === 'purple') {
            return 'button button__primary__purple';
        } else return 'button button__primary';
    }
}
</script>

<style>
.button-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px !important;
    color: white;
    text-transform: none !important;
    letter-spacing: normal;
}
</style>
