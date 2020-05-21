import { AxiosRepository } from '@/requests/interfaces/axios.repository';
import { CategoryType } from '@/requests/category-types/CategoryType';

const RESOURCE = 'category-type';
export class CategoryTypeRepository extends AxiosRepository {
    constructor() {
        super(RESOURCE);
    }
    async getAll(): Promise<CategoryType> {
        return super.getAll();
    }
}

export const categoryTypeRepository = new CategoryTypeRepository();
