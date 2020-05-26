import { Module } from 'vuex';
import {ProductCreationStateInterface} from "@/store/products/interfaces/product.creation.state.interface";
import {PRODUCT_CREATION_EMPTY_STATE} from "@/store/products/states/product.creation.state";
import {
    PRODUCT_CREATION_GET_CATEGORIES,
    PRODUCT_CREATION_IS_LOADING_CATEGORIES
} from "@/store/products/getters/product.creation.getters";
import {CategoryType} from "@/requests/category-types/CategoryType";
import {
    PRODUCT_CREATION_CREATE,
    PRODUCT_CREATION_FETCH_CATEGORIES
} from "@/store/products/actions/product.creation.actions";
import {categoryTypeRepository} from "@/requests/category-types/category-type.repository";
import {
    PRODUCT_CREATION_SET_CATEGORIES,
    PRODUCT_CREATION_SET_IS_LOADING_CATEGORIES
} from "@/store/products/mutations/product.creation.mutations";
import {productsRepository} from "@/requests/products/products.repository";


const productCreation: Module<ProductCreationStateInterface, any> = {
    namespaced: true,
    state: PRODUCT_CREATION_EMPTY_STATE,
    getters: {
        [PRODUCT_CREATION_IS_LOADING_CATEGORIES](state): boolean
        {
            return state.isLoadingCategories;
        },
        [PRODUCT_CREATION_GET_CATEGORIES](state): CategoryType[]
        {
            return state.categories;
        }
    },
    mutations: {
        [PRODUCT_CREATION_SET_CATEGORIES](state, categories: CategoryType[]): void
        {
            state.categories = categories;
        },
        [PRODUCT_CREATION_SET_IS_LOADING_CATEGORIES](state, isLoading: boolean): void
        {
            state.isLoadingCategories = isLoading;
        }
    },
    actions: {
        async [PRODUCT_CREATION_FETCH_CATEGORIES]({commit})
        {
            try {
                commit(PRODUCT_CREATION_SET_IS_LOADING_CATEGORIES, true);
                const categories: CategoryType[] = await categoryTypeRepository.getAll();
                commit(PRODUCT_CREATION_SET_IS_LOADING_CATEGORIES, false);
                commit(PRODUCT_CREATION_SET_CATEGORIES, categories);
                return true;
            } catch (e) {
                commit(PRODUCT_CREATION_SET_IS_LOADING_CATEGORIES, false);
                return false;
            }
        },
        async [PRODUCT_CREATION_CREATE]({commit}, data: ProductCreationStateInterface): Promise<boolean>
        {
            try {
                const response = await productsRepository.post(data);
                console.log(JSON.stringify(response))
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
};
export default productCreation;