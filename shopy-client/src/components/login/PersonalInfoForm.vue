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
                class="mb-4 hoverImage"
                @click="openWidget"
            >
                <v-icon large v-if="image == ''" color="white"
                    >mdi-camera</v-icon
                >
                <img v-else :src="image" />
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
                        v-model="user.person.name"
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
                        v-model="user.person.lastname"
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
                <div class="form__group" @click="openModal">
                    <input
                        type=""
                        class="form__input"
                        :placeholder="date"
                        id="date"
                        readonly
                        v-model="user.person.birthDate"
                    />
                    <label for="birthday" class="form__label">Birthday</label>
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
                        v-model="user.addresses[0].firstLine"
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
                        v-model="user.addresses[0].secondLine"
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
                            v-model="user.addresses[0].city"
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
                            v-model="user.addresses[0].state"
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
                        v-model="user.addresses[0].postalCode"
                    />
                    <label for="code" class="form__label">{{
                        this.$language.get('address.zip-code')
                    }}</label>
                </div>
            </div>
        </div>

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
import {PropSync} from "vue-property-decorator";
import {User} from "@/requests/users/User";
import {ImageWidget} from "@/utils/image-widget";
import {user} from "@/store/namespaces";
import {USER_SIGN_UP} from "@/store/users/actions/user.actions";

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
        user: {
            person: {
                name: {required},
                lastname: {required},
                birthDate: {required}
            },
            addresses: {
                $each: {
                    firstLine: {required},
                    city: { required },
                    state: { required }
                }
            }
        }
    }
})

export default class PersonalInfoForm extends Vue {
    private imageWidget!: ImageWidget;

    private imageData: string | null = '';
    public image: string = "";
    private menu = false;
    private dateModal = false;
    private date = new Date().toISOString().substr(0, 10);
    $refs!: {
        decitionModal: any;
        dateModal: any;
    };
    @PropSync("userData", {required: true, type: Object})
    user!: User;

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
        return this.user.person!.image;
    }

    public async signUp() {
        if (!this.user.person!.image) {
            this.$refs.decitionModal.openModal();
        }
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        }
        const u: User = {...this.user};
        delete u.person;
        await this.signUpUser({user: u, person: this.user.person});
        this.$router.push("/");
    }

    private receiveResponse(response: string) {}

    private openModal() {
        this.$refs.dateModal.openModal();
    }

    private getDate(date: string) {
        this.user.person!.birthDate! = date;
        this.date = date;
    }

    get firstNameErrors() {
        const errors: Array<string> = [];
        if (!this.$v.user.person!.name.$dirty) return errors;
        !this.$v.user.person!.name.required &&
            errors.push(this.$language.get('sign-up.errors.name-required'));
        return errors;
    }
    get lastNameErrors() {
        const errors: Array<string> = [];
        if (!this.$v.user.person!.lastname!.$dirty) return errors;
        !this.$v.user.person!.lastname.required &&
            errors.push(
                this.$language.get('sign-up.errors.last-name-required')
            );
        return errors;
    }

    get addressPrimaryLineErrors() {
        const errors: Array<string> = [];
        /*if (!this.$v.addressPrimaryLine.$dirty) return errors;
        !this.$v.addressPrimaryLine.required &&
            errors.push(this.$language.get('sign-up.errors.address-required'));*/
        return errors;
    }
    get addressCityErrors() {
        const errors: Array<string> = [];
        /*if (!this.$v.addressCity.$dirty) return errors;
        !this.$v.addressCity.required &&
            errors.push(this.$language.get('sign-up.errors.city-required'));*/
        return errors;
    }
    get addressStateErrors() {
        const errors: Array<string> = [];
        /*if (!this.$v.addressState.$dirty) return errors;
        !this.$v.addressState.required &&
            errors.push(this.$language.get('sign-up.errors.state-required'));*/
        return errors;
    }

    setImage(url: string)
    {
        this.user.person!.image = url;
        this.image = url;
    }

    openWidget()
    {
        this.imageWidget.open();
    }

    mounted()
    {
        this.imageWidget = new ImageWidget(this.setImage)
    }

    @user.Action(USER_SIGN_UP) signUpUser!: Function;
}
</script>

<style>
.hoverImage{
    cursor: pointer;
}

.hoverImage:hover{
    opacity: 0.7;
}

.image-preview {
    width: min-content;
    margin-left: 125px;
    cursor: pointer;
    margin-bottom: 10px;
}

img.preview {
    width: 50px;
    height: auto;
    margin: 0 auto;
    cursor: pointer;
}
</style>
