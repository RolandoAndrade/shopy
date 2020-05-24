<template>
    <div class="bg-white padding-medium">
        <Title :size="'title-secondary'" class="ma-6">Our categories</Title>
        <v-carousel height="max-content" hide-delimiter-background>
            <v-carousel-item v-for="(slide, i) in categories" :key="i">
                <v-sheet color="white" height="100%" class="padding-medium">
                    <div class="flex wrap">
                        <HomeCard
                            v-for="(cat, ind) in slide.x"
                            :key="ind"
                            :type="'card-categories'"
                            :title="cat.title"
                        >
                            <Icon :icon="cat.icon" :size="'icon-medium'" color="orange-i" class="mb-4"/>
                        </HomeCard>
                    </div>
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeCard from '../cards/HomeCard.vue';
import Title from '../typography/Title.vue';
import Icon from '@/components/typography/Icon.vue';

@Component({
    components: {
        HomeCard,
        Title,
        Icon
    }
})
export default class Carrousel extends Vue {
    public categories: Record<string, any> = [
        {
            x: [
                { title: 'Animales y mascotas', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' }
            ]
        },
        {
            x: [
                { title: 'Animales y mascotas', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' },
                { title: 'Vehiculos', icon: 'icon-gift' }
            ]
        }
    ];
}
</script>
<style></style>
