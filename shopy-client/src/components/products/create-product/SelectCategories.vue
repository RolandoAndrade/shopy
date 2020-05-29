<template>
    <v-form style="height:500px;" ref="form" lazy-validation v-model="valid">
        <div color="white" class="card-create mb-8  mt-8 inline to-column">
            <div class="inline half to-column">
                <div class="column cover">
                    <v-select
                        v-model="selectedCategory"
                        color="orange"
                        :items="this.availableCategories"
                        item-text="name"
                        :label="this.$language.get('sell.step-1.categories')"
                        class="pa-3"
                        return-object
                        :rules="[
                            rules.required(
                                this.$language.get('sell.step-1.error')
                            )
                        ]"
                    >
                    </v-select>
                    <v-container fluid v-if="selectedCategory">
                        <v-select
                            color="orange"
                            return-object
                            v-model="categoriesSaved"
                            :items="selectedCategory.categories"
                            item-text="name"
                            :label="
                                this.$language.get('sell.step-1.subcategories')
                            "
                            multiple
                            :rules="[
                                rules.required(
                                    this.$language.get('sell.step-1.error')
                                )
                            ]"
                        >
                            <template v-slot:selection="{ item, index }">
                                <v-chip v-if="index >= 0 && index < 3">
                                    <span>{{ item.name }}</span>
                                </v-chip>
                                <span
                                    v-if="index === 3"
                                    class="grey--text caption"
                                    >(+ {{ value.length - 3 }}
                                    {{
                                        this.$language.get(
                                            'sell.step-1.others'
                                        )
                                    }})</span
                                >
                            </template>
                        </v-select>
                    </v-container>
                </div>
            </div>
        </div>
        <div class="space-around wrap">
            <ButtonSecondary @click.native="validate">{{
                this.$language.get('sell.btn-continue')
            }}</ButtonSecondary>
            <ButtonSecondary :reverse="true" @click.native="$emit('goBack')">{{
                this.$language.get('sell.btn-back')
            }}</ButtonSecondary>
        </div>
    </v-form>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Popup from '@/components/generic/Popup.vue';
import Vue from 'vue';
import { productCreation } from '@/store/namespaces';
import { PRODUCT_CREATION_GET_CATEGORIES } from '@/store/products/getters/product.creation.getters';
import { CategoryType } from '@/requests/category-types/CategoryType';
import { Category } from '@/requests/category/Category';
import { FormRules } from '@/rules/form.rules';
import { Emit } from 'vue-property-decorator';

@Component({
    components: {
        ButtonSecondary,
        Popup
    }
})
export default class SelectCategories extends Vue {
    $refs!: {
        errorModal: any;
        form: any;
    };

    @Emit()
    validate() {
        if (this.$refs.form.validate()) {
            this.$emit('nextStep', this.categoriesSaved);
        }
    }

    rules: FormRules = new FormRules();
    selectedCategory: CategoryType | null = null;
    categoriesSaved: Category[] | null = null;
    valid = true;

    @productCreation.Getter(PRODUCT_CREATION_GET_CATEGORIES)
    availableCategories!: CategoryType[];
}
</script>

<style lang="scss"></style>
