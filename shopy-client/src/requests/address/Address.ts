import { User } from '../users/User';

export class Address {

    public id? :number;
    public first_line?:string;
    public second_line?:string;
    public city?: string;
    public state?: string;
    public postal_code?: number;
    public user?: User

}
