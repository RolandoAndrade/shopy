import { Module } from 'vuex';
import { USER_FETCH_PRODUCTS } from '@/store/users/actions/user.products.actions';
import {USER_LOGIN_FEDERATED} from '@/store/users/actions/user.actions';
import { USER_SET_PRODUCTS } from '@/store/users/mutations/user.products.mutations';
import { Product } from '@/requests/products/Product';
import { usersRepository } from '@/requests/users/users.repository';
import { User } from '@/requests/users/User';
import { UserStateInterface } from '@/store/users/interfaces/user.state.interface';
import {
    GET_PRODUCTS_DATA,
    USER_GET_USER
} from '@/store/users/getters/user.getters';
import { USER_ONE_STATE } from '@/store/users/states/user.states';
import {USER_SIGN_UP} from "@/store/users/actions/user.actions";
import {UserSignupInterface} from "@/interfaces/user-signup.interface";
import {PayloadInterface} from "@/interfaces/payload.interface";
import {authRepository} from "@/requests/auth/auth.repository";
import {USER_SET_USER} from "@/store/users/mutations/user.mutations";

const user: Module<UserStateInterface, any> = {
    namespaced: true,
    state: USER_ONE_STATE,
    getters: {
        [GET_PRODUCTS_DATA](state): Product[] {
            return state.user.products!;
        },
        [USER_GET_USER](state): User {
            return state.user;
        }
    },
    mutations: {
        [USER_SET_PRODUCTS](state, userProducts: User): void {
            state.user = userProducts;
        },
        [USER_SET_USER](state, user: User): void {
            state.user = user;
        }
    },
    actions: {
        async [USER_FETCH_PRODUCTS]({ commit, state }): Promise<boolean> {
            try {
                const userProducts: User = await usersRepository.getByUrl(
                    'products',
                    4
                );
                commit(USER_SET_PRODUCTS, userProducts);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [USER_LOGIN_FEDERATED]({commit, state},loginInfo :{email:string,username:string,image:string}): Promise<any>{
            try{
                console.log(loginInfo);
                const payload: PayloadInterface = await authRepository.signInFederated(loginInfo);
                console.log(payload)
                return true;
            }catch(e){
                return false;
            }
        },
     
        async [USER_SIGN_UP]({commit}, user: UserSignupInterface): Promise<boolean>
        {
            try {
                const payload: boolean = await authRepository.signUp(user);
                if(payload)
                {
                    //dispatchLogin
                }
                return payload;
            }
            catch (e) {
                return false;
            }

        }
    }
};
export default user;
