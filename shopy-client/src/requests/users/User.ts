import { ShoppingHistory } from '@/requests/shopping-history/ShoppingHistory';
import { Cart } from '@/requests/cart/Cart';
import { Product } from '@/requests/products/Product';
import { Review } from '@/requests/reviews/Review';
import { Person } from '@/requests/person/Person';
import { Role } from '@/requests/role/Role';
import { Badge } from '@/requests/badge/Badge';
import { Address } from '@/requests/address/Address';

export class User {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    person?: Person;
    role?: Role;
    badge?: Badge;
    addresses?: Address[];
    shoppingHistories?: ShoppingHistory[];
    carts?: Cart[];
    products?: Product[];
    reviews?: Review[];
    constructor(id: any) {
        this.id = id;
    }
}
