import { Module } from 'vuex';
import { USER_FETCH_PRODUCTS } from '@/store/users/actions/user.products.actions';
import { USER_SET_PRODUCTS } from '@/store/users/mutations/user.products.mutations';
import { Product } from '@/requests/products/Product';
import { usersRepository } from '@/requests/users/users.repository';
import { User } from '@/requests/users/User';
import {UserStateInterface} from "@/store/users/interfaces/user.state.interface";
import {GET_PRODUCTS_DATA, USER_GET_USER} from "@/store/users/getters/user.getters";
import {USER_ONE_STATE} from "@/store/users/states/user.states";

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
            console.log('en set');
            state.user = userProducts;
        },
    },
    actions: {
        async [USER_FETCH_PRODUCTS](
            { commit, state}
        ): Promise<boolean> {
            try {
                const userProducts: User= await usersRepository.getByUrl('products', 4);
                commit(USER_SET_PRODUCTS, userProducts);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
};
export default user;
