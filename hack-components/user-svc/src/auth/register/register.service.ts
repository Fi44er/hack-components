import { Injectable } from '@nestjs/common';
import { UserRes, FirstStageRegReq, FirstStageRegRes, SecondStageRegReq, ParamsReg } from 'proto/user_svc';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { EmailerService } from 'src/mailer/emailer.service';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { generateVerifyCode } from 'lib/utils/verify-code/generate-verify-code.util';
import { checkValidCodeVerify } from 'lib/utils/verify-code/checkValidCodeVerify.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateTokensService } from 'lib/utils/generate-tokens/generate-tokens.service';
import { Observable } from 'rxjs';

@Injectable()
export class RegisterService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly emailerService: EmailerService,
        private readonly configService: ConfigService,
        private readonly generateTokensService: GenerateTokensService
    ) { }

    async firstStageReg(dto: FirstStageRegReq): Promise<FirstStageRegRes> {
        // проверка на существующего пользователя
        const existUser = await this.prismaService.user.findFirst({ where: { email: dto.email } })
        if (existUser) throw new RpcException({
            message: "Пользователь с такой почтой уже существует",
            code: status.ALREADY_EXISTS
        })

        // проверка паролей на совпадение
        if (dto.password !== dto.passwordRepeat) throw new RpcException({
            message: "Пароли не совпадают",
            code: status.INVALID_ARGUMENT
        })
        
        // генерация и отправка кода верификации 
        const code = generateVerifyCode()
        await this.emailerService.sendEmail({ code, email: dto.email })

        await this.prismaService.verificationCode.upsert({
            where: { email: dto.email },
            update: {
                code,
                createdAt: new Date(Date.now())
            },
            create: {
                code,
                email: dto.email,
                createdAt: new Date(Date.now())
            }
        })
               
        return { status: true }
    }

    async secondStageReg(dto: SecondStageRegReq): Promise<any> {
        const existCode = await this.prismaService.verificationCode.findFirst({ where: { email: dto.dto.email } })
        if (!existCode) throw new RpcException({
            message: "Отправить код верификации повторно",
            code: status.INVALID_ARGUMENT
        })

        await checkValidCodeVerify(existCode.createdAt, this.configService)

        // if(existCode.code !== dto.dto.code) throw new RpcException({
        //     message: "Неверный код верификации",
        //     code: status.INVALID_ARGUMENT
        // })

        
        

        const user = await this.userService.save({ email: dto.dto.email, password: dto.dto.password })
        await this.prismaService.verificationCode.delete({ where: { email: dto.dto.email } })
        const tokens = await this.generateTokensService.generateTokens(user, dto.agent.agent)
        // console.log(tokens);
        
        return tokens
    }



    async regestration(dto: Observable<ParamsReg>): Promise<Observable<any>> { //сыро
        return new Observable((observer) => {
            dto.subscribe((user) => {
                if (user.secondStageRegReq) {
                    observer.next({ status: true });
                    observer.complete()
                }

                switch (user) {
                    case user.firstStageRegReq:
                        return this.firstStageReg(user.firstStageRegReq)
                    case user.secondStageRegReq:
                        return this.secondStageReg(user.secondStageRegReq)
                }
                

            })
        })
    }
}

