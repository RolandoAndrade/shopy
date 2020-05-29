import { Module } from 'vuex';
import { PRODUCTS_VIEW_EMPTY_STATE } from '@/store/products/states/products.view.states';
import {
    GET_CATEGORIES,
    GET_SEARCH,
    GET_TOTAL_PRODUCTS,
    HOW_MANY_PAGES_ARE,
    LIST_OF_PRODUCTS
} from '@/store/products/getters/products.view.getters';
import { ProductsViewStateInterface } from '@/store/products/interfaces/products.view.state.interface';
import { Product } from '@/requests/products/Product';
import {
    PRODUCTS_VIEW_SET_CATEGORIES,
    PRODUCTS_VIEW_SET_PAGE,
    PRODUCTS_VIEW_SET_PRODUCTS,
    PRODUCTS_VIEW_SET_SEARCH,
    PRODUCTS_VIEW_SET_TOTAL
} from '@/store/products/mutations/products.view.mutations';
import {
    PRODUCTS_VIEW_CHANGE_PAGE,
    PRODUCTS_VIEW_FETCH_ALL_PRODUCTS,
    PRODUCTS_VIEW_FETCH_CATEGORIES,
    PRODUCTS_VIEW_SEARCH,
    PRODUCTS_VIEW_SEARCH_BY_CATEGORIES,
    PRODUCTS_VIEW_SEARCH_BY_NEW,
    PRODUCTS_VIEW_SEARCH_BY_REVIEW,
    PRODUCTS_VIEW_SEARCH_BY_FILTERS
} from '@/store/products/actions/products.view.actions';
import { productsRepository } from '@/requests/products/products.repository';
import { ProductsViewInterface } from '@/requests/interfaces/products.view.interface';
import { Filter } from '@/utils/filter';
import { MAX_PRODUCTS_BY_PAGE } from '@/constants/pagination.constants';
import { ProductFilters } from '@/utils/product.filters';
import { CategoryType } from '@/requests/category-types/CategoryType';
import { categoryTypeRepository } from '@/requests/category-types/category-type.repository';
import { SectionInterface } from '@/interfaces/section.interface';
import { getIcon } from '@/utils/icons.functions';

const productsView: Module<ProductsViewStateInterface, any> = {
    namespaced: true,
    state: PRODUCTS_VIEW_EMPTY_STATE,

    getters: {
        [LIST_OF_PRODUCTS](state): Product[] {
            return state.products;
        },
        [HOW_MANY_PAGES_ARE](state): number {
            return Math.floor(state.total / MAX_PRODUCTS_BY_PAGE);
        },
        [GET_CATEGORIES](state): SectionInterface[] {
            return state.categories.map(i => {
                return <SectionInterface>{
                    id: i.id,
                    name: i.name,
                    parent: i.categories && i.categories.length > 0,
                    open: false,
                    openIcon: 'mdi-chevron-down',
                    icon: getIcon(i.name!),
                    children: i.categories!.map(j => {
                        return {
                            name: j.name,
                            id: j.id
                        };
                    })
                };
            });
        },
        [GET_TOTAL_PRODUCTS](state) {
            return state.total;
        },
        [GET_SEARCH](state) {
            return state.search;
        }
    },

    mutations: {
        [PRODUCTS_VIEW_SET_PRODUCTS](state, products: Product[]): void {
            state.products = products;
        },
        [PRODUCTS_VIEW_SET_TOTAL](state, total: number): void {
            state.total = total;
        },
        [PRODUCTS_VIEW_SET_PAGE](state, page: number): void {
            state.page = page;
        },
        [PRODUCTS_VIEW_SET_SEARCH](state, search: string): void {
            state.search = search;
        },
        [PRODUCTS_VIEW_SET_CATEGORIES](
            state,
            categories: CategoryType[]
        ): void {
            state.categories = categories;
        }
    },

    actions: {
        async [PRODUCTS_VIEW_SEARCH_BY_FILTERS]({ commit }, filter: Filter) {
            const products: ProductsViewInterface = await productsRepository.getAllFiltered(
                filter
            );
            commit(PRODUCTS_VIEW_SET_PRODUCTS, products.products);
            commit(PRODUCTS_VIEW_SET_TOTAL, products.productsNumber);
        },
        async [PRODUCTS_VIEW_FETCH_CATEGORIES]({ commit }): Promise<boolean> {
            try {
                const categories: CategoryType[] = await categoryTypeRepository.getAll();
                commit(PRODUCTS_VIEW_SET_CATEGORIES, categories);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCTS_VIEW_FETCH_ALL_PRODUCTS]({ commit }): Promise<boolean> {
            try {
                const products: ProductsViewInterface = await productsRepository.getAll();
                commit(PRODUCTS_VIEW_SET_PRODUCTS, products.products);
                commit(PRODUCTS_VIEW_SET_TOTAL, products.productsNumber);
                commit(PRODUCTS_VIEW_SET_SEARCH, '');
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCTS_VIEW_CHANGE_PAGE](
            { commit, state, dispatch },
            newPage: number
        ): Promise<boolean> {
            try {
                const data: ProductFilters = {
                    start: newPage,
                    name:
                        state.search && state.search.length
                            ? state.search
                            : undefined
                };
                const filter: Filter = new Filter(data);
                dispatch(PRODUCTS_VIEW_SEARCH_BY_FILTERS, filter);
                commit(PRODUCTS_VIEW_SET_PAGE, newPage);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCTS_VIEW_SEARCH](
            { commit, state, dispatch },
            search: string
        ): Promise<boolean> {
            try {
                commit(PRODUCTS_VIEW_SET_PAGE, 1);
                commit(PRODUCTS_VIEW_SET_SEARCH, search);
                const data: ProductFilters = {
                    name:
                        state.search && state.search.length
                            ? state.search
                            : undefined
                };
                const filter: Filter = new Filter(data);
                dispatch(PRODUCTS_VIEW_SEARCH_BY_FILTERS, filter);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCTS_VIEW_SEARCH_BY_CATEGORIES](
            { commit, dispatch },
            id: number
        ): Promise<boolean> {
            try {
                const data: ProductFilters = { categoryId: id };
                const filter: Filter = new Filter(data);
                dispatch(PRODUCTS_VIEW_SEARCH_BY_FILTERS, filter);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCTS_VIEW_SEARCH_BY_NEW](
            { commit, dispatch },
            newProduct: boolean
        ): Promise<boolean> {
            try {
                const data: ProductFilters = { new: newProduct };
                const filter: Filter = new Filter(data);
                console.log(filter);
                commit(PRODUCTS_VIEW_SET_SEARCH, '');
                dispatch(PRODUCTS_VIEW_SEARCH_BY_FILTERS, filter);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCTS_VIEW_SEARCH_BY_REVIEW](
            { commit, dispatch },
            productScore: number
        ): Promise<boolean> {
            try {
                const data: ProductFilters = { score: productScore };
                const filter: Filter = new Filter(data);
                console.log(filter);
                commit(PRODUCTS_VIEW_SET_SEARCH, '');
                dispatch(PRODUCTS_VIEW_SEARCH_BY_FILTERS, filter);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
};

export default productsView;
