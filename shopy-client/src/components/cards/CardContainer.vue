<template>
    <div class="flex wrap padding-medium margin-medium">
        <HomeCard
            v-for="(item, k) in items"
            :key="k"
            :title="item.title"
            :type="'card-us margin-small'"
        >
            <img
                :src="require(`@/assets/${item.icon}`)"
                class="card-us__image"
            />
        </HomeCard>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import HomeCard from './HomeCard.vue';
import Vue from 'vue';
@Component({
    components: {
        HomeCard
    }
})
export default class CardContainer extends Vue {
    @Prop() items!: Record<string, any>;
}
</script>

<style></style>
