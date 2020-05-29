<template>
    <div>
        <button class="google-button" @click="signIn()">
                <img class="google-button__icon" src="../../assets/google.png"/>
                <div class="google-button__text">
                    <slot/>
                </div>
        </button>
    </div>
</template>

<script lang="ts">

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import firebase, {User} from 'firebase/app';
    import {signInFederatedRepository} from '../../requests/federated-login/federated-login.repository';
    import "firebase/auth";
    import { user } from '../../store/namespaces';

    @Component({
})
export default class FederatedLogin extends Vue{

    private provider = new firebase.auth.GoogleAuthProvider();
    @Prop() type! :string;
    private user!: User;
    private profile!: {name?:string};

    private async signIn(){
          let user = await signInFederatedRepository.verifyEmail();
          console.log(user);
         await this.signupFederated(user);
    }

    @user.Action('USER_LOGIN_FEDERATED')
    signupFederated!: Function;
}
</script>

<style lang="scss">

.google-button{
  width:200px;
  border-radius:3px;
  margin:0 auto;
  margin-bottom: 10px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  display:flex;
  align-items:center;
  padding:1rem;
  transition: all .2s;
  outline: none;
  cursor:pointer; 
  &__icon{
    height:17.4px;
  }
  &__text{
    margin-left:2rem;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 12.5px !important;
  }
  
  &:hover{
      transform:translateY(-2px); 
  }
}
</style>