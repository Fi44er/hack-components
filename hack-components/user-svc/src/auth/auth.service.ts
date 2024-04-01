import { GenerateCodeReq, GenerateCodeRes } from 'src/proto/user_svc';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { EmailerService } from 'src/mailer/emailer.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService : UserService,
        private readonly emailerService: EmailerService
    ) {}

    async register(dto: GenerateCodeReq): Promise<GenerateCodeRes> {
        // существует ли почта
        const existUser = await this.prismaService.user.findFirst({ where: { email: dto.email } })
        if(existUser) throw new RpcException({
            message: "Пользователь с такой почтой уже существует",
            code: status.ALREADY_EXISTS
        })

        // совпадают ли пароли
        if(dto.password !== dto.passwordRepeat) throw new RpcException({
            message: "Пароли не совпадают",
            code: status.INVALID_ARGUMENT
        })
        
        // генерация и отправка кода
        const code = this.generateVerifyCode()
        await this.emailerService.sendEmail({ code, email: dto.email })
        
        return { status: true }
    }

    private generateVerifyCode() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
// autentificaton.module.ts lohost:3000/autentification/ [auth || reg ]