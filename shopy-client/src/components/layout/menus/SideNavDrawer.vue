<template>
    <v-navigation-drawer
        disable-resize-watcher
        hide-overlay
        permanent
        left
        clipped
    >
        <slot></slot>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class NavDrawer extends Vue {}
</script>

<style></style>
