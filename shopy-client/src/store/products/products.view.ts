import {Module} from "vuex";
import {PRODUCTS_VIEW_EMPTY_STATE} from "@/store/products/states/products.view.states";
import {LIST_OF_PRODUCTS} from "@/store/products/getters/products.view.getters";
import {ProductsViewStateInterface} from "@/store/products/interfaces/products.view.state.interface";
import {Product} from "@/requests/products/Product";
import {
    PRODUCTS_VIEW_SET_PAGE,
    PRODUCTS_VIEW_SET_PRODUCTS, PRODUCTS_VIEW_SET_SEARCH,
    PRODUCTS_VIEW_SET_TOTAL
} from "@/store/products/mutations/products.view.mutations";
import {
    PRODUCTS_VIEW_CHANGE_PAGE,
    PRODUCTS_VIEW_FETCH_ALL_PRODUCTS, PRODUCTS_VIEW_SEARCH, PRODUCTS_VIEW_SEARCH_BY_FILTERS
} from "@/store/products/actions/products.view.actions";
import {productsRepository} from "@/requests/products/products.repository";
import {ProductsViewInterface} from "@/requests/interfaces/products.view.interface";
import {Filter} from "@/utils/filter";
import {NUMBER_BY_PAGE} from "@/constants/pagination.constants";
import {ProductFilters} from "@/utils/product.filters";

const productsView: Module<ProductsViewStateInterface, any> = {
    namespaced: true,
    state: PRODUCTS_VIEW_EMPTY_STATE,

    getters: {
        [LIST_OF_PRODUCTS](state): Product[]
        {
            return state.products;
        }
    },

    mutations: {
        [PRODUCTS_VIEW_SET_PRODUCTS](state, products: Product[]): void
        {
            state.products = products;
        },
        [PRODUCTS_VIEW_SET_TOTAL](state, total: number): void
        {
            state.total = total;
        },
        [PRODUCTS_VIEW_SET_PAGE](state, page: number): void
        {
            state.page = page;
        },
        [PRODUCTS_VIEW_SET_SEARCH](state, search: string): void
        {
            state.search = search;
        }
    },

    actions: {
        async [PRODUCTS_VIEW_SEARCH_BY_FILTERS]({commit}, filter: Filter)
        {
            const products:ProductsViewInterface = await productsRepository.getAllFiltered(filter);
            commit(PRODUCTS_VIEW_SET_PRODUCTS, products.products);
            commit(PRODUCTS_VIEW_SET_TOTAL, products.total);
        },

        async [PRODUCTS_VIEW_FETCH_ALL_PRODUCTS]({commit}): Promise<boolean>
        {
            try {
                const products:ProductsViewInterface = await productsRepository.getAll();
                commit(PRODUCTS_VIEW_SET_PRODUCTS, products.products);
                commit(PRODUCTS_VIEW_SET_TOTAL, products.total);
                return true;
            }
            catch (e) {
                return false;
            }
        },
        async [PRODUCTS_VIEW_CHANGE_PAGE]({commit, state, dispatch}): Promise<boolean>
        {
            try {
                const data: ProductFilters = {
                    start: state.page*NUMBER_BY_PAGE,
                    name: state.search&&state.search.length?state.search:undefined
                };
                const filter: Filter = new Filter(data);
                dispatch(PRODUCTS_VIEW_SEARCH_BY_FILTERS, filter);
                commit(PRODUCTS_VIEW_SET_PAGE, state.page + 1);
                return true;
            }
            catch (e) {
                return false;
            }
        },
        async [PRODUCTS_VIEW_SEARCH]({commit, state, dispatch}, search: string): Promise<boolean>
        {
            try {
                commit(PRODUCTS_VIEW_SET_PAGE, 1);
                commit(PRODUCTS_VIEW_SET_SEARCH, search);
                const data: ProductFilters = {
                    start: state.page,
                    name: state.search&&state.search.length?state.search:undefined
                };
                const filter: Filter = new Filter(data);
                dispatch(PRODUCTS_VIEW_SEARCH_BY_FILTERS, filter);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    }
};

export default productsView;