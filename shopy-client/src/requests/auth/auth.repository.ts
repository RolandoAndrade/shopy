import {AxiosRepository} from "@/requests/interfaces/axios.repository";
import {UserSignupInterface} from "@/interfaces/user-signup.interface";
import {PayloadInterface} from "@/interfaces/payload.interface";


const RESOURCE = "auth";
const SIGN_UP = "signup";

export class AuthRepository extends AxiosRepository {
    constructor() {
        super(RESOURCE);
    }

    signUp(user: UserSignupInterface): Promise<PayloadInterface>
    {
        return super.postByUrl(SIGN_UP, user);
    }
}

export const authRepository = new AuthRepository();