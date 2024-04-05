import { Injectable } from '@nestjs/common';
import { RegisterReq, RegisterRes, VerifyCodeReq, VerifyCodeRes } from 'proto/user_svc';
import { RpcException } from '@nestjs/microservices';
import { Metadata, status } from '@grpc/grpc-js';
import { EmailerService } from 'src/mailer/emailer.service';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { generateVerifyCode } from 'lib/utils/verify-code/generate-verify-code.util';
import { checkValidCodeVerify } from 'lib/utils/verify-code/checkValidCodeVerify.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateTokensService } from 'lib/utils/generate-tokens/generate-tokens.service';
import { User } from '@prisma/client';

@Injectable()
export class RegisterService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly emailerService: EmailerService,
        private readonly configService: ConfigService,
        private readonly generateTokensService: GenerateTokensService
    ) { }

    async register(dto: RegisterReq): Promise<RegisterRes> {
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

    async verifyCode(dto: VerifyCodeReq): Promise<VerifyCodeRes> {
        const existCode = await this.prismaService.verificationCode.findFirst({ where: { email: dto.body.email } })
        if (!existCode) throw new RpcException({
            message: "Отправить код верификации повторно",
            code: status.INVALID_ARGUMENT
        })

        await checkValidCodeVerify(existCode.createdAt, this.configService)
        if(dto.body.code !== existCode.code) throw new RpcException({
            message: "Неверный код верификации",
            code: status.INVALID_ARGUMENT
        })
        
        const existUser = await this.prismaService.user.findUnique({ where: { email: dto.body.email } })
        const user: User = !existUser ? await this.userService.save({ email: dto.body.email, password: dto.body.password }) : null
        await this.prismaService.verificationCode.delete({ where: { email: dto.body.email } })

        if (user) {

            const token = await this.generateTokensService.generateTokens(user, dto.agent)
            return token
        }


        const token = await this.generateTokensService.generateTokens(existUser, dto.agent)
        return token
    }
}
