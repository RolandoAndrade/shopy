import { Test, TestingModule } from '@nestjs/testing';
import {ConfigService} from "../../config/config.service";
import {User} from "../user/user.entity";
import {SendGridMailService} from "./send-grid-mail.service";

describe('MailsService', () => {
  let service: SendGridMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendGridMailService,ConfigService],
    }).compile();

    service = module.get<SendGridMailService>(SendGridMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Mandar un correo', async ()=>{

  })
});
