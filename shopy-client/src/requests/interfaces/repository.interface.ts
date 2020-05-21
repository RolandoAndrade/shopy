import { Filter } from '@/utils/filter';

export interface RepositoryInterface {
    get(id: number): Promise<any>;
    getAll(): Promise<any>;
    getByFilters(filters: Filter): Promise<any>;
    getAllFiltered(filters: Filter): Promise<any>;
    post(data: {}): Promise<any>;
    put(id: number, data: {}): Promise<any>;
    delete(id: number): Promise<any>;
}
