<template>
    <div style="height:500px;">
        <div color="white" class="card-create mb-8  mt-8 inline to-column">
            <div class="inline half to-column">
                <div class="column cover">
                    <v-select
                        color="orange"
                        :items="items"
                        filled
                        label="Categories"
                        dense
                        class="pa-3"
                        v-on:input="selectItem"
                    ></v-select>
                    <v-container fluid v-if="active">
                        <v-select
                            color="orange"
                            :return-object="true"
                            v-model="value"
                            :items="subitems"
                            :hint="
                                `${subitems.name}, ${subitems.id},${subitems.active}`
                            "
                            item-text="name"
                            label="Select your sub categories"
                            multiple
                        >
                            <template v-slot:selection="{ item, index }">
                                <v-chip v-if="index >= 0 && index < 3">
                                    <span>{{ item.name }}</span>
                                </v-chip>
                                <span
                                    v-if="index === 3"
                                    class="grey--text caption"
                                    >(+ {{ value.length - 3 }} others)</span
                                >
                            </template>
                        </v-select>
                    </v-container>
                </div>
            </div>
        </div>
        <div class="space-around wrap">
            <ButtonSecondary @click.native="setDialog"
                >Continue</ButtonSecondary
            >
            <ButtonSecondary :reverse="true" @click.native="$emit('goBack')"
                >Go back</ButtonSecondary
            >
        </div>
        <Popup
            ref="errorModal"
            message="You must select at lest one category"
            :response="false"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Popup from '@/components/generic/Popup.vue';

@Component({
    components: {
        ButtonSecondary,
        Popup
    }
})
export default class SelectCategories extends Vue {
    private activeCategory!: string;
    private active = false;
    private subitems: Array<object> = [];
    private value: Array<object> = []; // Se guardan las categorias seleccionadas
    $refs!: {
        errorModal: any;
    };
    // private dialog: boolean =false;
    // private response? : boolean ;
    //  private messageDialog?: string;

    private subCategories: Array<{
        category: string;
        active: boolean;
        childrens: Array<{ id: number; name: string; active: boolean }>;
    }> = [
        {
            category: 'Technology',
            active: false,
            childrens: [
                { id: 1, name: 'Phones', active: false },
                { id: 3, name: 'Tv', active: false },
                { id: 4, name: 'Computers', active: false }
            ]
        },
        {
            category: 'Sports',
            active: false,
            childrens: [
                { id: 5, name: 'Soccer', active: false },
                { id: 6, name: 'Tennis', active: false },
                { id: 7, name: 'Softball', active: false },
                { id: 8, name: 'Baseball', active: false },
                { id: 9, name: 'Basketball', active: false },
                { id: 10, name: 'Karate', active: false }
            ]
        }
    ];
    private items: Array<string> = [];

    private getCategories() {
        for (let i = 0; i < this.subCategories.length; i++) {
            this.items[i] = this.subCategories[i].category;
        }
    }

    created() {
        this.getCategories();
    }

    private selectItem(a: string) {
        this.active = true;
        this.activeCategory = a;
        for (let i = 0; i < this.subCategories.length; i++) {
            if (this.subCategories[i].category === a) {
                this.subitems.splice(0, this.subitems.length);
                for (
                    let j = 0;
                    j < this.subCategories[i].childrens.length;
                    j++
                ) {
                    this.subitems.push({
                        name: this.subCategories[i].childrens[j].name,
                        id: this.subCategories[i].childrens[j].id,
                        active: this.subCategories[i].childrens[j].active
                    });
                }
            }
        }
    }

    private setDialog() {
        if (this.value.length > 0 || this.activeCategory) {
            this.$emit('nextStep', this.value, this.activeCategory);
        } else {
            this.$refs.errorModal.openModal();
        }
    }
}
</script>

<style lang="scss"></style>
