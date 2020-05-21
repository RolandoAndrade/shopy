import { User } from '@/requests/users/User';
import { Stock } from '@/requests/stock/Stock';
import { Review } from '@/requests/reviews/Review';
import { ShoppingHistory } from '@/requests/shopping-history/ShoppingHistory';
import { Cart } from '@/requests/cart/Cart';
import { ProductCategory } from '@/requests/product-category/ProductCategory';
import { ProductImage } from '@/requests/product-image/ProductImage';

export class Product {
    public id?: number;
    public name?: string;
    public price?: number;
    public description?: string;
    public score?: number;
    public discount?: number;
    public width?: number;
    public height?: number;
    public depth?: number;
    public new?: boolean;
    public user?: User;
    public stock?: Stock;
    public reviews?: Review[];
    public shoppingHistories?: ShoppingHistory[];
    public carts?: Cart[];
    public productCategories?: ProductCategory[];
    public productImages?: ProductImage[];
}
