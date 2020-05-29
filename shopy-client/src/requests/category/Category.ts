import { CategoryType } from '@/requests/category-types/CategoryType';

export class Category {
    id?: number;
    name?: string;
    description?: string;
    categoryType?: CategoryType;
}
