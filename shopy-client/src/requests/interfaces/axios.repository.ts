import axios from 'axios';
import { Filter } from '@/utils/filter';
import { EnvironmentConstants } from '@/constants/environmentConstants';
import { RepositoryInterface } from '@/requests/interfaces/repository.interface';

export abstract class AxiosRepository implements RepositoryInterface {
    private URL: string;

    protected constructor(resource: string) {
        this.URL = EnvironmentConstants.HOST + resource;
    }

    public async delete(id: number): Promise<any> {
        return (await axios.delete(this.URL + '/' + id)).data;
    }

    public async deleteAll(data: {}): Promise<any> {
        return (await axios.delete(this.URL, { data })).data;
    }

    public async get(id: number): Promise<any> {
        return (await axios.get(this.URL + '/' + id)).data;
    }

    public async getAll(): Promise<any> {
        return (await axios.get(this.URL)).data;
    }

    public async getAllFiltered(filters: Filter): Promise<any> {
        return (await axios.get(this.URL + '?' + filters.get())).data;
    }

    public async getByFilters(filters: Filter): Promise<any> {
        return (await axios.get(this.URL + '?' + filters.get())).data;
    }

    async post(data: {}): Promise<any> {
        return (await axios.post(this.URL, data)).data;
    }

    async put(id: number, data: {}): Promise<any> {
        return (await axios.put(this.URL + '/' + id, data)).data;
    }

    async getByUrl(url: string, id: number): Promise<any> {
        return (await axios.get(this.URL + '/' + url + '/' + id)).data;
    }

    public createAuthenticationHeader(data: string): {} {
        return {};
    }
}
