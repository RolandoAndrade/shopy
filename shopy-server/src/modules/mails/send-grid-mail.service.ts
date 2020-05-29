import {ConfigService} from "../../config/config.service";
import {ConfigKeys} from "../../config/config.keys";
import  * as fs from 'fs'
import {User} from "../user/user.entity";
import {MailService} from "./mail.service";
import {Injectable} from "@nestjs/common";

const FROM_EMAIL = "rolandoandrade.developer@gmail.com";
const CREATE_USER_TEMPLATE_PATH = "templates/welcome-email.html";
const CREATE_USER_TEMPLATE_SUBJECT = "Bienvenido a Shopy";
@Injectable()
export class SendGridMailService extends MailService
{
    constructor(private readonly _configService: ConfigService) {
        super();
    }
    public async sendUserEmail(user: User): Promise<{statusCode: number}[]>
    {
        const sendGridMail = require('@sendgrid/mail');
        let stringTemplate = fs.readFileSync(CREATE_USER_TEMPLATE_PATH, "utf8");
        stringTemplate = stringTemplate.replace(/%name%/g, user.person.name);
        stringTemplate = stringTemplate.replace(/%surname%/g, user.person.lastname);
        sendGridMail.setApiKey(this._configService.get(ConfigKeys.SEND_GRID_API_KEY));
        const message = {
            to: user.email,
            from: FROM_EMAIL,
            subject: CREATE_USER_TEMPLATE_SUBJECT,
            html: stringTemplate,
        };
        return await sendGridMail.send(message);
    }

    sendRecuperationMail(email: string): Promise<{ statusCode: number }[]> {
        return undefined;
    }
}
