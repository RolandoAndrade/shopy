import { CategoryType } from '@/requests/category-types/CategoryType';

export interface ProductCreationStateInterface {
    categories: CategoryType[];
    isLoadingCategories: boolean;
}
