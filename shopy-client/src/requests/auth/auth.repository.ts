import {AxiosRepository} from "@/requests/interfaces/axios.repository";
import {UserSignupInterface} from "@/interfaces/user-signup.interface";
import {PayloadInterface} from "@/interfaces/payload.interface";
import {UserSignupFederatedInterface} from  "@/interfaces/sign-in-federated.interface";

const RESOURCE = "auth";
const SIGN_UP = "signup";
const SIGN_UP_FEDERATED="google/signin";


export class AuthRepository extends AxiosRepository {
    constructor() {
        super(RESOURCE);
    }


    signInFederated(user: UserSignupFederatedInterface): Promise<PayloadInterface>
    {
        return super.postByUrl(SIGN_UP_FEDERATED,user);
    }
    signUp(user: UserSignupInterface): Promise<boolean>
    {
        return super.postByUrl(SIGN_UP, user);
    }
}

export const authRepository = new AuthRepository();