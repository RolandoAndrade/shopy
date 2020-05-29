import {Filter} from "@/utils/filter";

export interface DaoInterface {
    get(id: number): Promise<{}>;
    getAll(): Promise<{}[]>;
    getByFilters(filters: Filter): Promise<{}>;
    getAllFiltered(filters: Filter): Promise<{}[]>;
    post(data: {}): Promise<{}>;
    put(id: number, data: {}): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}