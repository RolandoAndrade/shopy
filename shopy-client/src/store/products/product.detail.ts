import {Module} from "vuex";
import {ProductsDetailsStateInterface} from "@/store/products/interfaces/products.details.state.interface";
import {PRODUCT_DETAIL_EMPTY_STATE} from "@/store/products/states/products.details.state";
import {PRODUCTS_DETAIL_FETCH_PRODUCT} from "@/store/products/actions/products.detail.actions";
import {PRODUCTS_DETAIL_SET_PRODUCT} from "@/store/products/mutations/products.details.mutations";
import {Product} from "@/requests/products/Product";
import {productsRepository} from "@/requests/products/products.repository";
import {GET_PRODUCT_DATA} from "@/store/products/getters/products.detail.getters";


const productDetail: Module<ProductsDetailsStateInterface, any> = {
    namespaced: true,
    state: PRODUCT_DETAIL_EMPTY_STATE,
    getters: {
        [GET_PRODUCT_DATA](state): Product
        {
            return state.product;
        }
    },
    mutations: {
        [PRODUCTS_DETAIL_SET_PRODUCT](state, product: Product): void
        {
            state.product = product;
        }
    },
    actions: {
        async [PRODUCTS_DETAIL_FETCH_PRODUCT]({commit}, id: number): Promise<boolean>
        {
            try
            {
                const product: Product = await productsRepository.get(id);
                commit(PRODUCTS_DETAIL_SET_PRODUCT, product);
                return true;
            }
            catch (e)
            {
                return false;
            }
        }
    }

};
export default productDetail;