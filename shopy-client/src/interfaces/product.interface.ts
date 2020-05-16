export interface ProductInterface{
    id: number,
    title: string, 
    price: number,
    author: string,
    condition: string,
    description: string,
    image: string ,
    images?: Array<{id:number,name:string}>,
    rating?: number,
    stock: number
}