import {UserStateInterface} from "@/store/users/interfaces/user.state.interface";
import {Module} from "vuex";
import {USER_EMPTY_STATE, USER_ONE_STATE} from "@/store/users/states/user.states";
import {USER_GET_USER} from "@/store/users/getters/user.getters";
import {User} from "@/requests/users/User";

const user: Module<UserStateInterface, any> = {
    namespaced: true,
    state: USER_ONE_STATE,
    getters: {
        [USER_GET_USER](state): User
        {
            return state.user;
        }
    },
    mutations: {
    },
    actions: {
    }
};
export default user;