import { Module } from 'vuex';
import { STORE_EXAMPLE_EMPTY_STATE } from '@/store/store-example/states/store-example.states';
import { STORE_EXAMPLE_GETTER } from '@/store/store-example/getters/store-example.getters';
import { STORE_EXAMPLE_MUTATION } from '@/store/store-example/mutations/store-example.mutations';
import { STORE_EXAMPLE_ACTION } from '@/store/store-example/actions/store-example.actions';

const storeExample: Module<any, any> = {
    namespaced: true, //siempre
    state: {
        ...STORE_EXAMPLE_EMPTY_STATE
    },
    getters: {
        [STORE_EXAMPLE_GETTER](state): string {
            return state.example;
        }
    },
    mutations: {
        [STORE_EXAMPLE_MUTATION](state, example): void {
            state.example = example;
        }
    },
    actions: {
        async [STORE_EXAMPLE_ACTION]({ commit }, id) {
            //let x = await DAO.peticion(id); se hace una petición al DAO
            const x = 'respuesta'; // simulo la respuesta
            commit(STORE_EXAMPLE_MUTATION, x);
        }
    }
};
export default storeExample;
