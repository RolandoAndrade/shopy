<template>
    <form action="#" class="form">
        <Title :size="'title-secondary'" class="ma-6" style="tex-align:start;"
            >Login to Shopy</Title
        >
        <FederatedLogin :provider="provider" type="login">
            Sign in with google
        </FederatedLogin>
        <div class="title-center mb-2">or</div>
        <div class="form__group">
            <input
                type="email"
                class="form__input"
                placeholder="Email account"
                id="email"
                required
            />
            <label for="email" class="form__label">Email account</label>
        </div>
        <div class="form__group">
            <input
                type="password"
                class="form__input"
                placeholder="Password"
                id="password"
                required
            />
            <label for="password" class="form__label">Password</label>
        </div>
        <ButtonPrimary :color="'purple'" class="flex mb-4"
            >Log in</ButtonPrimary
        >
        <div class="title-center mr-2">
            Don't have an account yet?
            <a class="title-center" @click="() => $router.push('/signup')"
                >Sign up</a
            >
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/typography/Title.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import FederatedLogin from '@/components/login/FederatedLogin.vue';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
    components: {
        Title,
        ButtonPrimary,
        FederatedLogin
    }
})
export default class SignInForm extends Vue {
    private provider = new firebase.auth.GoogleAuthProvider();
}
</script>

<style></style>
