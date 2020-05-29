import { User } from "src/modules/user/user.entity";
import { Person } from "src/modules/person/person.entity";

export interface UserSignup {
    user: User,
    person: Person
}