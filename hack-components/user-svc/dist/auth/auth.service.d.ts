import { GenerateCodeReq, GenerateCodeRes } from 'src/proto/user_svc';
import { PrismaService } from './../prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { EmailerService } from 'src/mailer/emailer.service';
export declare class AuthService {
    private readonly prismaService;
    private readonly userService;
    private readonly emailerService;
    constructor(prismaService: PrismaService, userService: UserService, emailerService: EmailerService);
    register(dto: GenerateCodeReq): Promise<GenerateCodeRes>;
    private generateVerifyCode;
}
