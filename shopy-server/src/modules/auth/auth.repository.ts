import { EntityRepository, Repository, getConnection, getManager } from "typeorm";
import { User } from "../user/user.entity";
import { Person } from "../person/person.entity";
import { Role } from "../role/role.entity";
import { GENERAL_ROL } from "../role/role.constants";
import { Badge } from "../badge/badge.entity";
import { DOLAR_BADGE } from "../badge/badge.constants";
import { UserGoogleSignin } from "./interfaces/user-google-signin";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
    
    async signup(user: User, person: Person):Promise<Boolean>{

        const roleRepository = await getConnection().getRepository(Role);
        user.role = await roleRepository.findOne({ name: GENERAL_ROL });

        const badgeRepository = await getConnection().getRepository(Badge);
        user.badge = await badgeRepository.findOne({ name: DOLAR_BADGE });

        return await getManager().transaction(async transactionEntityManager => {
            try {
                const personTransactionRepository: Repository<Person> = transactionEntityManager.getRepository(Person);
                user.person = await personTransactionRepository.save(person);
                const userTransactionRepository: Repository<User> = transactionEntityManager.getRepository(User);
                await userTransactionRepository.save(user);
                return true;
            } catch (error) {
                throw error;
            }
        });
    }

    async signupGoogle(userGoogleSignin: UserGoogleSignin): Promise<User> {

        let user = new User();
        user.email = userGoogleSignin.email;
        user.username = userGoogleSignin.username;
        user.federate = true;
        
        const roleRepository = await getConnection().getRepository(Role);
        user.role = await roleRepository.findOne({ name: GENERAL_ROL });

        const badgeRepository = await getConnection().getRepository(Badge);
        user.badge = await badgeRepository.findOne({ name: DOLAR_BADGE });

        let person = new Person();
        const names = userGoogleSignin.email.split(' ');
        person.name = names[0];
        if(names.length > 1){
            person.lastname = names[1];
        } else {
            person.lastname = '';
        }
        person.image = userGoogleSignin.image; 

        return await getManager().transaction(async transactionEntityManager => {
            try {
                const personTransactionRepository: Repository<Person> = transactionEntityManager.getRepository(Person);
                user.person = await personTransactionRepository.save(person);
                const userTransactionRepository: Repository<User> = transactionEntityManager.getRepository(User);
                return await userTransactionRepository.save(user);
            } catch (error) {
                throw error;
            }
        });
    }


}