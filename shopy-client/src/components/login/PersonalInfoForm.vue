<template>
    <div class="form">
        <GoBackButton />
        <Title
            :size="'title-secondary'"
            class="pt-6"
            style="tex-align:start;"
            >{{ this.$language.get('sign-up.title') }}</Title
        >
        <div class="flex mt-2 mb-2">
            <v-avatar
                color="orange"
                size="60"
                class="mb-4 "
                onclick="document.getElementById('file').click();"
            >
                <v-icon large v-if="getImage === ''" color="white"
                    >mdi-camera</v-icon
                >
                <img v-else :src="imageData" />
            </v-avatar>
        </div>
        <input
            type="file"
            id="file"
            style="display:none;"
            @change="previewImage"
        />
        <div class="flex to-column">
            <div class="form__big-group">
                <div class="title-center mt-2">
                    {{ this.$language.get('sign-up.your-photo') }}
                </div>

                <div class="form__group mt-2 ">
                    <input
                        type="text"
                        v-model="firstName"
                        class="form__input"
                        :placeholder="this.$language.get('user.name')"
                        id="name"
                        required
                    />
                    <label for="name" class="form__label">{{
                        this.$language.get('user.name')
                    }}</label>
                    <div
                        v-for="(i, ind) in firstNameErrors"
                        :key="ind"
                        class="text-error mt-2"
                    >
                        {{ i }}
                    </div>
                </div>
                <div class="form__group">
                    <input
                        type="text"
                        v-model="lastName"
                        class="form__input"
                        :placeholder="this.$language.get('user.last-name')"
                        id="lastname"
                        required
                    />
                    <label for="lastname" class="form__label">{{
                        this.$language.get('user.last-name')
                    }}</label>
                    <div
                        v-for="(i, ind) in lastNameErrors"
                        :key="ind"
                        class="text-error mt-2"
                    >
                        {{ i }}
                    </div>
                </div>
                <div class="form__group" v-on:click="openModal">
                    <input
                        type=""
                        class="form__input"
                        :placeholder="date"
                        id="birthday"
                        readonly
                    />
                    <label for="birthday" class="form__label">{{ date }}</label>
                </div>
                <DatePopup ref="dateModal" :date="date" @getDate="getDate" />
                <ButtonPrimary
                    :color="'purple'"
                    class="flex mb-6"
                    @click.native="signUp"
                    >{{ this.$language.get('sign-up.name') }}</ButtonPrimary
                >
            </div>
            <div class="form__big-group">
                <div class="title-center mb-2">
                    {{ this.$language.get('sign-up.your-address') }}:
                </div>
                <div class="form__group">
                    <input
                        type=""
                        class="form__input"
                        v-model="addressPrimaryLine"
                        :placeholder="
                            this.$language.get('address.primary-line')
                        "
                        id="primary-line"
                        required
                    />
                    <label for="primary-line" class="form__label"
                        >{{
                            this.$language.get('address.primary-line')
                        }}
                        *</label
                    >
                    <div
                        v-for="(i, ind) in addressPrimaryLineErrors"
                        :key="ind"
                        class="text-error mt-2"
                    >
                        {{ i }}
                    </div>
                </div>
                <div class="form__group">
                    <input
                        type=""
                        class="form__input"
                        :placeholder="
                            this.$language.get('address.secondary-line')
                        "
                        id="secondary-line"
                        required
                    />

                    <label for="secondary-line" class="form__label">{{
                        this.$language.get('address.secondary-line')
                    }}</label>
                </div>
                <div class="form__group flex">
                    <div class="form__group-half mr-2">
                        <input
                            type=""
                            class="form__input"
                            :placeholder="this.$language.get('address.city')"
                            id="city"
                            required
                        />
                        <label for="city" class="form__label">{{
                            this.$language.get('address.city')
                        }}</label>
                        <div
                            v-for="(i, ind) in addressCityErrors"
                            :key="ind"
                            class="text-error mt-2"
                        >
                            {{ i }}
                        </div>
                    </div>

                    <div class="form__group-half">
                        <input
                            type=""
                            v-model="addressState"
                            class="form__input"
                            :placeholder="this.$language.get('address.state')"
                            id="state"
                            required
                        />
                        <label for="state" class="form__label">{{
                            this.$language.get('address.state')
                        }}</label>
                        <div
                            v-for="(i, ind) in addressStateErrors"
                            :key="ind"
                            class="text-error mt-2"
                        >
                            {{ i }}
                        </div>
                    </div>
                </div>
                <div class="form__group">
                    <input
                        type="number"
                        class="form__input"
                        :placeholder="this.$language.get('address.zip-code')"
                        id="code"
                        required
                    />
                    <label for="code" class="form__label">{{
                        this.$language.get('address.zip-code')
                    }}</label>
                </div>
            </div>
        </div>
        <!--   <v-dialog ref="dialog" v-model="dateModal" :return-value.sync="date"
                               persistent width="290px">
                            <v-date-picker v-model="date" color="purple" scrollable>
                                 <v-spacer></v-spacer>
                                     <v-btn text color="purple" @click="modal = false">Cancel</v-btn>
                                     <v-btn text color="purple" @click="$refs.dialog.save(date)">OK</v-btn>
                                 </v-date-picker>
                    </v-dialog>-->

        <PopupDecition
            ref="decitionModal"
            @receiveResponse="receiveResponse"
            :text="this.$language.get('messages.profile-pic')"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Title from '@/components/typography/Title.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import PopupDecition from '@/components/generic/PopupDecition.vue';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import DatePopup from '@/components/generic/popups/DatePopup.vue';
import GoBackButton from '@/components/generic/GoBackButton.vue';

@Component({
    components: {
        Title,
        ButtonPrimary,
        PopupDecition,
        DatePopup,
        GoBackButton
    },
    mixins: [validationMixin],
    validations: {
        firstName: { required },
        lastName: { required },
        addressPrimaryLine: { required },
        addressCity: { required },
        addressState: { required }
    }
})
export default class PersonalInfoForm extends Vue {
    private imageData: string | null = '';
    private image!: File;
    private menu = false;
    private dateModal = false;
    private date = new Date().toISOString().substr(0, 10);
    $refs!: {
        decitionModal: any;
        dateModal: any;
    };

    private imageModal = false;
    private firstName = '';
    private lastName = '';
    private addressPrimaryLine = '';
    private addressCity = '';
    private addressState = '';

    private previewImage(e: Event) {
        console.log(e.target);
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                this.imageData = e.target!.result as string;
            };
            reader.readAsDataURL(target.files[0]);
        }
    }

    get getImage() {
        if (this.imageData!.length > 0) return this.imageData!;
        else return '';
    }

    private signUp() {
        if (!this.image) {
            this.$refs.decitionModal.openModal();
        }
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
    }

    private receiveResponse(response: string) {}

    private openModal() {
        this.$refs.dateModal.openModal();
    }

    private getDate(date: string) {
        this.date = date;
    }

    get firstNameErrors() {
        const errors: Array<string> = [];
        if (!this.$v.firstName.$dirty) return errors;
        !this.$v.firstName.required &&
            errors.push(this.$language.get('sign-up.errors.name-required'));
        return errors;
    }
    get lastNameErrors() {
        const errors: Array<string> = [];
        if (!this.$v.lastName.$dirty) return errors;
        !this.$v.lastName.required &&
            errors.push(
                this.$language.get('sign-up.errors.last-name-required')
            );
        return errors;
    }

    get addressPrimaryLineErrors() {
        const errors: Array<string> = [];
        if (!this.$v.addressPrimaryLine.$dirty) return errors;
        !this.$v.addressPrimaryLine.required &&
            errors.push(this.$language.get('sign-up.errors.address-required'));
        return errors;
    }
    get addressCityErrors() {
        const errors: Array<string> = [];
        if (!this.$v.addressCity.$dirty) return errors;
        !this.$v.addressCity.required &&
            errors.push(this.$language.get('sign-up.errors.city-required'));
        return errors;
    }
    get addressStateErrors() {
        const errors: Array<string> = [];
        if (!this.$v.addressState.$dirty) return errors;
        !this.$v.addressState.required &&
            errors.push(this.$language.get('sign-up.errors.state-required'));
        return errors;
    }
}
</script>

<style>
.image-preview {
    width: min-content;
    margin-left: 125px;
    margin-bottom: 10px;
}

img.preview {
    width: 50px;
    height: auto;
    margin: 0 auto;
    cursor: pointer;
}
</style>
