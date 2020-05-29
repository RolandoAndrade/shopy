import { User } from '../users/User';

export class Address {
    public id?: number;
    public firstLine?: string;
    public secondLine?: string;
    public city?: string;
    public state?: string;
    public postalCode?: number;
    public user?: User;
}
