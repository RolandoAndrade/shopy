import { Module } from 'vuex';
import { ProductsDetailsStateInterface } from '@/store/products/interfaces/products.details.state.interface';
import { PRODUCT_DETAIL_EMPTY_STATE } from '@/store/products/states/products.details.state';
import {
    PRODUCTS_DETAIL_FETCH_PRODUCT,
    PRODUCT_DETAIL_UPDATE_PRODUCT,
    PRODUCT_DETAIL_DELETE_IMAGES,
    PRODUCT_DETAIL_ADD_IMAGES,
    PRODUCT_DETAIL_DELETE_PRODUCT
} from '@/store/products/actions/products.detail.actions';
import { PRODUCTS_DETAIL_SET_PRODUCT } from '@/store/products/mutations/products.details.mutations';
import { Product } from '@/requests/products/Product';
import { DeleteResult } from '@/requests/interfaces/delete.result.interface';
import { productsRepository } from '@/requests/products/products.repository';
import { productImagesRepository } from '@/requests/product-image/product-image.repository';
import { imagesIds } from '@/interfaces/images.id.interface';
import { GET_PRODUCT_DATA } from '@/store/products/getters/products.detail.getters';
import { ProductImage } from '@/requests/product-image/ProductImage';
import { ProductImagesInterface } from '@/requests/product-image/product-images.interface';

const productDetail: Module<ProductsDetailsStateInterface, any> = {
    namespaced: true,
    state: PRODUCT_DETAIL_EMPTY_STATE,
    getters: {
        [GET_PRODUCT_DATA](state): Product {
            return state.product;
        }
    },
    mutations: {
        [PRODUCTS_DETAIL_SET_PRODUCT](state, product: Product): void {
            state.product = product;
        }
    },
    actions: {
        async [PRODUCTS_DETAIL_FETCH_PRODUCT](
            { commit },
            id: number
        ): Promise<boolean> {
            try {
                const product: Product = await productsRepository.get(id);
                commit(PRODUCTS_DETAIL_SET_PRODUCT, product);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCT_DETAIL_UPDATE_PRODUCT](
            { commit },
            product: Product
        ): Promise<boolean> {
            try {
                console.log('epa');
                console.log(product);
                const productUpdated: Product = await productsRepository.put(
                    product.id!,
                    product
                );

                commit(PRODUCTS_DETAIL_SET_PRODUCT, productUpdated);
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCT_DETAIL_DELETE_IMAGES](
            { commit },
            ids: imagesIds
        ): Promise<boolean> {
            try {
                const result: DeleteResult = await productImagesRepository.deleteAll(
                    ids
                );
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCT_DETAIL_ADD_IMAGES](
            { commit },
            images: ProductImagesInterface
        ): Promise<boolean> {
            try {
                console.log(images);
                const result: ProductImage[] = await productImagesRepository.post(
                    images
                );
                return true;
            } catch (e) {
                return false;
            }
        },
        async [PRODUCT_DETAIL_DELETE_PRODUCT](
            { commit },
            id: number
        ): Promise<boolean> {
            try {
                const result: DeleteResult = await productsRepository.delete(
                    id
                );
                if (result.affected! > 0) {
                    commit(
                        PRODUCTS_DETAIL_SET_PRODUCT,
                        PRODUCT_DETAIL_EMPTY_STATE
                    );
                }
                return true;
            } catch (e) {
                return false;
            }
        }
    }
};
export default productDetail;
