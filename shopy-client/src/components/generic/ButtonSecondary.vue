<template>
    <button :class="getClass()">
        <div class="button__text">
            <slot />
        </div>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ButtonPrimary extends Vue {
    @Prop() reverse?: boolean;

    private getClass(): string {
        if (this.reverse) return 'button button__reverse margin-medium';
        else return 'button button__secondary margin-medium';
    }
}
</script>
