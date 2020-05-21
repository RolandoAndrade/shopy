import { Product } from '@/requests/products/Product';
import { CategoryType } from '@/requests/category-types/CategoryType';

export interface ProductsViewStateInterface {
    products: Product[];
    total: number;
    page: number;
    search: string;
    categories: CategoryType[];
}
