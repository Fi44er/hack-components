import { Injectable } from '@nestjs/common';
import { GenerateTokensService } from 'lib/utils/generate-tokens/generate-tokens.service';
import { LoginReq } from 'proto/user_svc';
import { EmailerService } from 'src/mailer/emailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LoginService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly emailerService: EmailerService,
        private readonly generateTokensService: GenerateTokensService
    ) {}

    async login(dto: LoginReq) {
        
    }
}
