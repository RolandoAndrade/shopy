import { User } from '@/requests/users/User';
import { Product } from '@/requests/products/Product';

export class Cart {
    id?: number;
    quantity?: number;
    user?: User;
    product?: Product;
}
