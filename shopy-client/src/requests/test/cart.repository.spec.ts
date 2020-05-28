import {CartRepository} from "@/requests/cart/cart.repository";
import {Filter} from "@/utils/filter";

describe('Cart repository test', () => {
    let repository: CartRepository;

    beforeEach(async () => {
        repository = new CartRepository();
    });

    it('Get all carts', async () => {
        const carts = await repository.getAllFiltered(new Filter({userId: 1}));
        console.log(carts);
        expect(carts).toBeDefined();
        expect(carts).toBeInstanceOf(Array);
    });

});
