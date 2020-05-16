import {RepositoryInterface} from "@/requests/interfaces/repository.interface";
import {ProductsRepository} from "@/requests/products/products.repository";
import {configEnvironment} from "@/utils/config-environment";
import {ConfigKeys} from "@/constants/config.keys";
import {ProductsViewInterface} from "@/requests/interfaces/products.view.interface";

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