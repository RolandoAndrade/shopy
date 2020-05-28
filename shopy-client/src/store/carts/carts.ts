import {Module} from "vuex";
import {CartsStateInterfaces} from "@/store/carts/interfaces/carts.state.interfaces";
import {CART_EMPTY_STATE} from "@/store/carts/states/carts.states";
import {GET_CART} from "@/store/carts/getters/carts.getters";
import {Cart} from "@/requests/cart/Cart";
import {SET_CART} from "@/store/carts/mutations/carts.mutations";
import {CREATE_CART, DELETE_CART, FETCH_CART, UPDATE_CART} from "@/store/carts/actions/carts.actions";
import {User} from "@/requests/users/User";
import {cartRepository} from "@/requests/cart/cart.repository";
import {Filter} from "@/utils/filter";

const carts: Module<CartsStateInterfaces, any> = {
    namespaced: true,
    state: CART_EMPTY_STATE,
    getters: {
        [GET_CART](state): Cart[] {
            return state.cart || [];
        }
    },
    mutations: {
        [SET_CART](state, cart: Cart[]): void {
            state.cart = cart;
        }
    },
    actions: {
        async [FETCH_CART](
            { commit },
            user: User
        ): Promise<boolean> {
            try {
                const carts: Cart[] = await cartRepository.getAllFiltered(new Filter({userId: user.id}));
                commit(SET_CART, carts);
                return true;
            } catch (e) {
                return false;
            }
        },

        async [CREATE_CART]({commit}, cart: Cart)
        {
            try {
                cart.quantity = 1;
                const carts: Cart = await cartRepository.post(cart);
                return true;
            } catch (e) {
                return false;
            }
        },

        async [UPDATE_CART]({commit}, cart: Cart)
        {
            try {
                return await cartRepository.put(cart.id!, cart);
            } catch (e) {
                return false;
            }
        },

        async [DELETE_CART]({commit}, cart: Cart)
        {
            try {
                return await cartRepository.delete(cart.id!);
            } catch (e) {
                return false;
            }
        }
    }
};
export default carts;