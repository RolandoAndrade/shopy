<template>
    
         <section class="section-book">          
                  <div class="book">
                      <div class="book__form">
                          <form action="#" class="form">
                                <Title :size="'title-secondary'" class="ma-6" style="tex-align:start;">Login to Shopy</Title>
                                <FederatedLogin :provider="provider" type="login">
                                        Sign in with google
                                </FederatedLogin>
                                <div class="title-center mb-2">or</div>
                                <div class="form__group">
                                    <input type="email" class="form__input" placeholder="Email account" id="email" required>
                                    <label for="email" class="form__label">Email account</label>
                                </div>
                                <div class="form__group">
                                    <input type="password" class="form__input" placeholder="Password" id="password" required>
                                    <label for="password" class="form__label">Password</label>
                                </div>
                                <ButtonPrimary :color="'purple'">Log in</ButtonPrimary>
                          </form>
                      </div> 
                </div>
          </section>
</template>

<script lang="ts">

import { Component, Prop, Vue,Watch } from 'vue-property-decorator';
import Title from '@/components/typography/Title.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import FederatedLogin from '@/components/login/FederatedLogin.vue';
import firebase from 'firebase/app';
import "firebase/auth";

@Component({
    components:{
        Title,
        ButtonPrimary,
        FederatedLogin
    }
})
export default class Login extends Vue{

    private provider = new firebase.auth.GoogleAuthProvider();
    
   /* private providers = [
        {google: new firebase.auth.GoogleAuthProvider(),
         name: 'google'
         },
         {facebook: new firebase.auth.FacebookAuthProvider(),
         name:'facebook'}
    ]*/

}
</script>

<style>

</style>