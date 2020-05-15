import { Product } from "./product.entity";

export interface ProductParameters {
    name?:string,
    score?:number,
    new?:boolean,
    categoryId?:number,
    categoryTypeId?:number,
    limit:number,
    start:number
}

export interface PaginatedProducts {
    products: Product[],
    productsNumber: number
}