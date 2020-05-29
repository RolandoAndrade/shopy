<template>
    <v-dialog v-model="localModal" persistent max-width="350px" width="90%">
        <v-card>
            <div class="pa-12 justify-center text-center">
                <v-icon class="ma-2" size="70" color="primary" v-if="isDelete">
                    mdi-help-circle
                </v-icon>
                <div class="headline text-center">{{ text }}</div>
            </div>

            <v-divider></v-divider>
            <Icon
                v-if="icon"
                icon="icon-x-circle"
                size="icon-big"
                color="error-i"
                class="mt-4"
            />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="purple" text @click="sendResponse(false)">{{
                    this.$language.get('messages.no')
                }}</v-btn>
                <v-btn color="purple" text @click="sendResponse(true)">{{
                    this.$language.get('messages.yes')
                }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import Icon from '@/components/typography/Icon.vue';

@Component({
    components: { Icon }
})
export default class PopupDecition extends Vue {
    @Prop() text!: string;
    @Prop() icon?: boolean;
    @Prop({ required: false, default: false }) isDelete!: boolean;
    private localModal = false;

    public sendResponse(response: boolean) {
        this.localModal = false;
        this.$emit('receiveResponse', response);
    }

    private openModal() {
        this.localModal = true;
    }
}
</script>

<style scoped>
.headline {
    font-size: 16px !important;
}
</style>
