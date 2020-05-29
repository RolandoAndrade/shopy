import { User } from "src/modules/user/user.entity";

export interface Payload{
    token: string,
    user: User
}