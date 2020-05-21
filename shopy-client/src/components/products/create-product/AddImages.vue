<template>
    <div>
        <div color="white" class="card-create mb-12 mt-6">
            <div class="ma-5 flex wrap">
                <div
                    v-for="n in cardimages"
                    :key="n"
                    class="card card-select-image ma-6"
                    @click="selected"
                >
                    <div v-if="!images[n - 1]" style="width:100%;">
                        <Icon
                            :icon="'icon-camera'"
                            :color="'grey-i'"
                            :size="'icon-big'"
                            style="width:100%;"
                        />
                        <input
                            type="button"
                            value="Click here!"
                            onclick="document.getElementById('file').click();"
                            style="outline:none;"
                            class="title-terciary"
                        />
                        <input
                            type="file"
                            id="file"
                            style="display:none;"
                            @change="selected"
                        />
                    </div>
                    <div v-else>
                        <Icon
                            :icon="'icon-checkmark2'"
                            :color="'success-i'"
                            :size="'icon-big'"
                            style="width:100%;"
                        />
                    </div>
                </div>
                <v-btn color="success" icon @click="cardimages++">
                    <v-icon large>mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>
        <div class="space-around wrap">
            <ButtonSecondary @click.native="nextStep()"
                >Finish it!</ButtonSecondary
            >
            <ButtonSecondary :reverse="true" @click.native="$emit('goBack')"
                >Go back</ButtonSecondary
            >
        </div>
        <Popup
            ref="errorModal"
            message="You must select at least one image"
            :response="false"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import Icon from '@/components/typography/Icon.vue';
import Popup from '@/components/generic/Popup.vue';

@Component({
    components: {
        ButtonSecondary,
        Icon,
        Popup
    }
})
export default class AddImages extends Vue {
    private images: Array<File> = [];
    private cardimages = 1;
    $refs!: {
        errorModal: any;
    };

    private selected(e: Event) {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        if (file !== undefined) {
            this.images.push(file);
        }
    }

    private nextStep() {
        if (this.images.length > 0) this.$emit('nextStep', this.images);
        else {
            this.$refs.errorModal.openModal();
        }
    }
}
</script>

<style></style>
