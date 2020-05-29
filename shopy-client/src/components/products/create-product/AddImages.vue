<template>
    <div>
        <div color="white" class="card-create mb-12 mt-6">
            <div class="ma-5 flex wrap">
                <div
                    v-for="(n, k) in images"
                    :key="k"
                    class="card card-select-image ma-6"
                >
                    <div v-if="!n" style="height:100%;">
                        <v-row
                            align="center"
                            class="fill-height"
                            @click="uploadImage(k)"
                        >
                            <Icon
                                :icon="'icon-camera'"
                                :color="'grey-i'"
                                :size="'icon-big'"
                            />
                        </v-row>
                    </div>
                    <div v-else @click="dropImage(k)">
                        <v-hover v-slot:default="{ hover }">
                            <v-avatar tile width="100px" height="100px">
                                <v-img :src="n">
                                    <div :class="{ backDark: hover }">
                                        <v-icon v-if="hover" color="red"
                                            >mdi-delete</v-icon
                                        >
                                    </div>
                                </v-img>
                            </v-avatar>
                        </v-hover>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-around wrap">
            <ButtonSecondary @click.native="nextStep()">{{
                this.$language.get('sell.step-3.btn-finish')
            }}</ButtonSecondary>
            <ButtonSecondary :reverse="true" @click.native="$emit('goBack')">{{
                this.$language.get('sell.btn-back')
            }}</ButtonSecondary>
        </div>
        <Popup
            ref="errorModal"
            :message="this.$language.get('sell.step-3.error')"
            :response="false"
        />
    </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Icon from '@/components/typography/Icon.vue';
import Popup from '@/components/generic/Popup.vue';
import Vue from 'vue';
import MultipleImageLoader from '../../../mixins/multiple-image-loader.mixin';
@Component({
    components: {
        ButtonSecondary,
        Icon,
        Popup
    }
})
export default class AddImages extends mixins(MultipleImageLoader) {
    public cardImages = 1;
    $refs!: {
        errorModal: any;
    };

    private nextStep() {
        if (this.images.length > 0 && this.images[0])
            this.$emit('nextStep', this.images);
        else {
            this.$refs.errorModal.openModal();
        }
    }

    public pushImage() {
        this.images.push(undefined);
    }

    public dropImage(index: number) {
        this.images.splice(index, 1);
    }
}
</script>

<style scoped>
.backDark {
    background: rgba(255, 255, 255, 0.6);
    width: 100%;
    height: 100%;
}
</style>
