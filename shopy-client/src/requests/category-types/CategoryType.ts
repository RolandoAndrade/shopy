import { Category } from '@/requests/category/Category';

export class CategoryType {
    id?: number;
    name?: string;
    description?: string;
    categories?: Category[];
}
