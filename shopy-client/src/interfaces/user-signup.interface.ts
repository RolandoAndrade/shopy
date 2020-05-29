import {User} from "@/requests/users/User";
import {Person} from "@/requests/person/Person";

export interface UserSignupInterface {
    user: User,
    person: Person
}