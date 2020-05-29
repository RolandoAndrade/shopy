import { ConfigKeys } from '@/constants/config.keys';
import { configEnvironment } from '@/utils/config-environment';
import  {User} from 'firebase/app';
import "firebase/auth";
import firebase from 'firebase'
import {UserSignupFederatedInterface} from '../../interfaces/sign-in-federated.interface';

export class SignInFederatedRepository {

    public async verifyEmail(): Promise<any> {
        let provider = new firebase.auth.GoogleAuthProvider();      
      const result = await  firebase
          .auth()
          .signInWithPopup(provider)
          
        let user = <User>result.user;
        return {email:user.email,username:user.displayName,image:""}
    }
}

export const signInFederatedRepository = new SignInFederatedRepository();
