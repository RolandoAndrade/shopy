import {RepositoryInterface} from "@/requests/interfaces/repository.interface";
import {CategoryTypeRepository} from "@/requests/category-types/category-type.repository";

describe('Product repository test', () => {

    let repository: RepositoryInterface;

    beforeEach(async () => {
        repository = new CategoryTypeRepository();
    });

    it('Get all categories', async () => {
        const categories = await repository.getAll();
        console.log(JSON.stringify(categories));
        expect(categories).toBeDefined();
        expect(categories).toBeInstanceOf(Array);
    });
});