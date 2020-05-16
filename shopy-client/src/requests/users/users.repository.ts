import {AxiosRepository} from "@/requests/interfaces/axios.repository";

const RESOURCE = "users";

export class UsersRepository extends AxiosRepository{

    constructor() {
        super(RESOURCE);
    }
}