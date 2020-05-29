import { AxiosRepository } from '@/requests/interfaces/axios.repository';
import { Product } from '@/requests/products/Product';
import { DeleteResult } from '@/requests/interfaces/delete.result.interface';
import { ProductImage } from './ProductImage';

const RESOURCE = 'product-images';

export class ProductImagesRepository extends AxiosRepository {
    constructor() {
        super(RESOURCE);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return super.delete(id);
    }
    public async deleteAll(data: {}): Promise<DeleteResult> {
        return super.deleteAll(data);
    }
    public async put(id: number, data: {}): Promise<ProductImage[]> {
        return super.put(id, data);
    }
}

export const productImagesRepository = new ProductImagesRepository();
