<template>
    <form action="#" class="form ">
        <Title :size="'title-secondary'" class="pt-6" style="tex-align:start;">
            {{ this.$language.get('sign-up.title') }}
        </Title>
        <FederatedLogin :provider="provider" type="login" class="mt-4">
            {{ this.$language.get('sign-up.name') }} with google
        </FederatedLogin>
        <div class="title-center mb-6">
            {{ this.$language.get('login.or') }}
        </div>

        <div class="form__group">
            <input
                type=""
                class="form__input"
                v-model="accountEmail"
                placeholder="Email account"
                id="email"
                @input="$v.accountEmail.$touch()"
                @blur="$v.accountEmail.$touch()"
            />
            <label for="email" class="form__label">{{
                this.$language.get('user.email')
            }}</label>
            <div
                v-for="(i, ind) in emailErrors"
                :key="ind"
                class="text-error mt-2"
            >
                {{ i }}
            </div>
        </div>
        <div class="form__group">
            <input
                type="password"
                class="form__input"
                v-model="accountPassword"
                placeholder="Password"
                id="password"
                @input="$v.accountPassword.$touch()"
                @blur="$v.accountPassword.$touch()"
            />
            <label for="password" class="form__label">{{
                this.$language.get('user.password')
            }}</label>
            <div
                v-for="(i, ind) in passwordErrors"
                :key="ind"
                class="text-error mt-2"
            >
                {{ i }}
            </div>
        </div>
        <div class="form__group">
            <input
                type="password"
                class="form__input"
                v-model="repeatPassword"
                placeholder="Repeat password"
                id="passwordr"
                @input="$v.repeatPassword.$touch()"
                @blur="$v.repeatPassword.$touch()"
            />
            <label for="passwordr" class="form__label">{{
                this.$language.get('sign-up.repeat-password')
            }}</label>
            <div
                v-for="(i, ind) in repeatPasswordErrors"
                :key="ind"
                class="text-error mt-2"
            >
                {{ i }}
            </div>
        </div>
        <ButtonPrimary
            :color="'purple'"
            class="flex mb-6"
            @click.native="changePage"
            >{{ this.$language.get('generic.next-step') }}</ButtonPrimary
        >
        <div class="title-center mr-2">
            {{ this.$language.get('sign-up.have-account') }}
            <a class="title-center" @click="() => $router.push('/login')">{{
                this.$language.get('login.name')
            }}</a>
        </div>
    </form>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Title from '@/components/typography/Title.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import FederatedLogin from '@/components/login/FederatedLogin.vue';
import Icon from '@/components/typography/Icon.vue';
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators';
import firebase from 'firebase/app';
import 'firebase/auth';
import { validationMixin } from 'vuelidate';
import Vue from 'vue';
import {User} from "@/requests/users/User";

@Component({
    components: {
        Title,
        ButtonPrimary,
        FederatedLogin,
        Icon
    },
    mixins: [validationMixin],
    validations: {
        accountEmail: { required, email },
        accountPassword: { required, minLength: minLength(6) },
        repeatPassword: { sameAsPassword: sameAs('accountPassword') }
    }
})
export default class UserAccountForm extends Vue {
    private provider = new firebase.auth.GoogleAuthProvider();
    private accountEmail = '';
    private accountPassword = '';
    private repeatPassword = '';

    get emailErrors() {
        const errors: Array<string> = [];
        if (!this.$v.accountEmail.$dirty) return errors;
        !this.$v.accountEmail.email &&
            errors.push(this.$language.get('sign-up.errors.invalid-email'));
        !this.$v.accountEmail.required &&
            errors.push(this.$language.get('sign-up.errors.email-required'));
        return errors;
    }

    get passwordErrors() {
        const errors: Array<string> = [];
        if (!this.$v.accountPassword.$dirty) return errors;
        !this.$v.accountPassword.minLength &&
            errors.push(this.$language.get('sign-up.errors.long-password'));
        !this.$v.accountEmail.required &&
            errors.push(this.$language.get('sign-up.errors.password-required'));

        return errors;
    }
    get repeatPasswordErrors() {
        const errors: Array<string> = [];
        if (!this.$v.repeatPassword.$dirty) return errors;
        !this.$v.repeatPassword.sameAsPassword &&
            errors.push(
                this.$language.get('sign-up.errors.identical-password')
            );
        return errors;
    }

    private changePage() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        } else {
            let u = new User();
            u.email = this.accountEmail;
            u.password = this.accountPassword;
            u.username = u.email.split("@")[0];
            this.$emit('changePage', u);
        }
    }
}
</script>

<style>
.v-input {
    font-size: 100px !important;
}
</style>
