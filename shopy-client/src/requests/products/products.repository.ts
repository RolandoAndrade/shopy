import { AxiosRepository } from '@/requests/interfaces/axios.repository';
import { Filter } from '@/utils/filter';
import { Product } from '@/requests/products/Product';
import { ProductsViewInterface } from '@/requests/interfaces/products.view.interface';

const RESOURCE = 'products';

export class ProductsRepository extends AxiosRepository {
    constructor() {
        super(RESOURCE);
    }

    public async delete(id: number): Promise<boolean> {
        return super.delete(id);
    }

    public async get(id: number): Promise<Product> {
        return super.get(id);
    }

    public async getAll(): Promise<ProductsViewInterface> {
        return super.getAll();
    }

    public async getAllFiltered(
        filters: Filter
    ): Promise<ProductsViewInterface> {
        return super.getAllFiltered(filters);
    }

    public async getByFilters(filters: Filter): Promise<Product> {
        return super.getByFilters(filters);
    }

    async post(data: {}): Promise<Product> {
        return super.post(data);
    }

    async put(id: number, data: Product): Promise<boolean> {
        return super.put(id, data);
    }
}

export const productsRepository = new ProductsRepository();
