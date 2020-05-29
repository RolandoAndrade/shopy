<template>
    <form action="#" class="form">
        <Title
            :size="'title-secondary'"
            class="ma-6"
            style="tex-align:start;"
            >{{ this.$language.get('login.title') }}</Title
        >
        <FederatedLogin :provider="provider" type="login">
            {{ this.$language.get('login.login-federated') }} google
        </FederatedLogin>
        <div class="title-center mb-2">
            {{ this.$language.get('login.or') }}
        </div>
        <div class="form__group">
            <input
                type="email"
                class="form__input"
                placeholder="Email account"
                id="email"
                v-model="email"
                required
            />
            <label for="email" class="form__label">
                {{ this.$language.get('user.email') }}</label
            >
        </div>
        <div class="form__group">
            <input
                type="password"
                class="form__input"
                placeholder="Password"
                v-model="password"
                id="password"
                required
            />
            <label for="password" class="form__label">
                {{ this.$language.get('user.password') }}</label
            >
        </div>
        <ButtonPrimary :color="'purple'" class="flex mb-4" @click.native="signIn">
            {{ this.$language.get('login.name') }}</ButtonPrimary
        >
        <div class="title-center mr-2">
            {{ this.$language.get('login.sign-up-question') }}
            <a class="title-center" @click="() => $router.push('/signup')">
                {{ this.$language.get('sign-up.name') }}</a
            >
        </div>
    </form>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Title from '@/components/typography/Title.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import FederatedLogin from '@/components/login/FederatedLogin.vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import Vue from 'vue';
import {user} from "@/store/namespaces";
import {USER_LOGIN} from "@/store/users/actions/user.actions";

@Component({
    components: {
        Title,
        ButtonPrimary,
        FederatedLogin
    }
})
export default class SignInForm extends Vue {
    private provider = new firebase.auth.GoogleAuthProvider();
    public email: string ="";
    public password: string ="";

    async signIn()
    {
        if(this.email && this.password)
        {
            if(await this.login({email: this.email, password: this.password}))
            {
                this.$router.push("/");
            }
            else
            {
                //error
            }
        }
        else
        {
            //error
        }

    }

    @user.Action(USER_LOGIN) login !: Function;
}
</script>

<style></style>
