import { AxiosRepository } from '@/requests/interfaces/axios.repository';
import { Commission } from '@/requests/commissions/Commission';

const RESOURCE = 'commission';

export class CommissionRepository extends AxiosRepository {
    constructor() {
        super(RESOURCE);
    }

    get(): Promise<Commission> {
        return super.getAll();
    }
}

export const commissionRepository = new CommissionRepository();
