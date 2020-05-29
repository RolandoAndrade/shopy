import { Cart } from '@/requests/cart/Cart';
import { Product } from '@/requests/products/Product';
import { User } from '@/requests/users/User';

function getItemsPerPage(
    items: Array<any>,
    currentPage: number,
    pageSize: number
) {
    return items.slice(
        (currentPage - 1) * pageSize,
        (currentPage - 1) * pageSize + pageSize
    );
}

function getLength(items: Array<any>, itemsPerPage: number) {
    return Math.ceil(items.length / itemsPerPage);
}

function isInCart(cart: Cart[], product: Product): boolean {
    return !!cart.find(i => i.product!.id === product.id);
}

function isPoster(product: Product, user: User): boolean {
    return product.user!.id === user.id;
}

export { getItemsPerPage, getLength, isInCart, isPoster };
