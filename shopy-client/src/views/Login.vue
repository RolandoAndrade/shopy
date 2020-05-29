<template>
    <section class="section-book">
        <div class="book">
            <GoBackButton />
            <div class="book__form">
                <SignInForm />
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignInForm from '@/components/login/SignInForm.vue';
import GoBackButton from '@/components/generic/GoBackButton.vue';

@Component({
    components: {
        SignInForm,
        GoBackButton
    }
})
export default class Login extends Vue {
    private loginFields: Array<object> = [
        { id: 1, name: 'Email', type: 'email', placeholder: 'Email account' },
        { id: 2, name: 'Password', type: 'password', placeholder: 'Password' }
    ];

    /* private providers = [
        {google: new firebase.auth.GoogleAuthProvider(),
         name: 'google'
         },
         {facebook: new firebase.auth.FacebookAuthProvider(),
         name:'facebook'}
    ]*/
}
</script>

<style></style>
