import {AxiosRepository} from "@/requests/interfaces/axios.repository";
import {Cart} from "@/requests/cart/Cart";
import {Filter} from "@/utils/filter";

const RESOURCE = 'carts';
export class CartRepository extends AxiosRepository{
    constructor() {
        super(RESOURCE);
    }

    async getAllFiltered(filter: Filter): Promise<Cart[]> {
        return super.getAllFiltered(filter);
    }

    async post(data: Cart): Promise<Cart> {
        return super.post(data);
    }

    async put(id: number, data: Cart): Promise<boolean> {
        return super.put(id, data);
    }

    async delete(id: number): Promise<boolean> {
        return super.delete(id);
    }
}

export const cartRepository = new CartRepository();