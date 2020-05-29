import {User} from "../user/user.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export abstract class MailService
{
    abstract sendUserEmail(user: User): Promise<{statusCode: number}[]>;
    abstract sendRecuperationMail(email: string): Promise<{statusCode: number}[]>;
}