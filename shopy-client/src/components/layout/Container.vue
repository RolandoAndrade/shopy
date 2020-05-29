<template>
    <div class="general-container">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Container extends Vue {}
</script>

<style></style>
