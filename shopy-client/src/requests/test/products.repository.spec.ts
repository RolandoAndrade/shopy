import {RepositoryInterface} from "@/requests/interfaces/repository.interface";
import {ProductsRepository} from "@/requests/products/products.repository";

describe('Product repository test', () => {

    let repository: RepositoryInterface;

    beforeEach(async () => {
        repository = new ProductsRepository();
    });

    it('Get all products', async () => {
        const products = await repository.getAll();
        console.log(products);
        expect(products).toBeDefined();
        expect(products.products).toBeInstanceOf(Array);
    });
});