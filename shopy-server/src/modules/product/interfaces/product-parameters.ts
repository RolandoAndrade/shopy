export interface ProductParameters {
    userId?: string,
    name?: string,
    score?: number,
    new?: boolean,
    categoryId?: number,
    categoryTypeId?: number,
    limit: number,
    start: number
}