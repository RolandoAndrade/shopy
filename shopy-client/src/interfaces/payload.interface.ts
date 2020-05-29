import {User} from "@/requests/users/User";

export interface PayloadInterface{
    token: string,
    user: User
}