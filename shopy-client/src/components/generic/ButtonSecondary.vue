<template>
    <v-btn :class="getClass()" :loading="isLoading">
        <div class="button__text button-text">
            <slot>

            </slot>
        </div>
    </v-btn>
</template>

<script lang="ts">
import Vue from "vue"
import { Prop } from 'vue-property-decorator';
import Component from "vue-class-component";
@Component({})
export default class ButtonPrimary extends Vue {
    @Prop() reverse?: boolean;
    @Prop({required: false, default: false})
    isLoading!: boolean;

    private getClass(): string {
        if (this.reverse) return 'button button__reverse margin-medium';
        else return 'button button__secondary margin-medium';
    }
}
</script>

<style>
    .button-text{
        font-family:'Poppins', sans-serif;
        font-size: 15px !important;
        color:white;
        text-transform: none !important;
        letter-spacing: normal;
    }

</style>