import { AxiosRepository } from '@/requests/interfaces/axios.repository';
import { User } from '@/requests/users/User';
import { Product } from '../products/Product';

const RESOURCE = 'users';

export class UsersRepository extends AxiosRepository {
    constructor() {
        super(RESOURCE);
    }

    public async get(id: number): Promise<User> {
        return super.get(id);
    }

    public async getByUrl(url: string, id: number): Promise<User> {
        return super.getByUrl(url, id);
    }
}

export const usersRepository = new UsersRepository();
