import { Module } from 'vuex';
import { USER_FETCH_PRODUCTS } from '@/store/users/actions/user.products.actions';
import {UPDATE_USER, USER_LOGIN_FEDERATED} from '@/store/users/actions/user.actions';
import { USER_SET_PRODUCTS } from '@/store/users/mutations/user.products.mutations';
import { Product } from '@/requests/products/Product';
import { usersRepository } from '@/requests/users/users.repository';
import { User } from '@/requests/users/User';
import { UserStateInterface } from '@/store/users/interfaces/user.state.interface';
import {
    GET_PRODUCTS_DATA, IS_LOGGED,
    USER_GET_USER
} from '@/store/users/getters/user.getters';
import {USER_EMPTY_STATE, USER_ONE_STATE} from '@/store/users/states/user.states';
import {USER_LOGIN, USER_SIGN_UP} from "@/store/users/actions/user.actions";
import {UserSignupInterface} from "@/interfaces/user-signup.interface";
import {PayloadInterface} from "@/interfaces/payload.interface";
import {authRepository} from "@/requests/auth/auth.repository";
import {USER_SET_USER} from "@/store/users/mutations/user.mutations";

const user: Module<UserStateInterface, any> = {
    namespaced: true,
    state: USER_EMPTY_STATE,
    getters: {
        [GET_PRODUCTS_DATA](state): Product[] {
            return state.user.products!;
        },
        [USER_GET_USER](state): User {
            return state.user;
        },
        [IS_LOGGED](state): boolean
        {
            return !!state.user.id;
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
                    state.user.id!
                );
                commit(USER_SET_PRODUCTS, userProducts);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [USER_LOGIN_FEDERATED]({commit, state},loginInfo :{email:string,username:string,image:string}): Promise<any>{
            try{

                const payload: PayloadInterface = await authRepository.signInFederated(loginInfo);
                localStorage.setItem("token", payload.token);
                commit(USER_SET_USER, payload.user);
                return true;
            }catch(e){
                return false;
            }
        },

        async [USER_SIGN_UP]({commit, dispatch}, user: UserSignupInterface): Promise<boolean>
        {
            try {
                const payload: boolean = await authRepository.signUp(user);
                if(payload)
                {
                    if(!(await dispatch(USER_LOGIN, user.user)))
                    {
                        return false;
                    }
                }
                return payload;
            }
            catch (e) {
                return false;
            }
        },
        async [USER_LOGIN]({commit}, user: {email: string, password: string}): Promise<boolean>
        {
            try {
                const payload: PayloadInterface = await authRepository.login(user);
                commit(USER_SET_USER, payload.user);
                localStorage.setItem("token", payload.token);
                return true;
            }
            catch (e) {
                return false;
            }
        },
        async [UPDATE_USER]({commit}, user: User)
        {
            try{
                const p :User = await usersRepository.put(user.id!, user)
                commit(USER_SET_USER, p);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
};
export default user;
