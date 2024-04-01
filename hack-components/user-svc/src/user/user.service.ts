import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { status } from '@grpc/grpc-js'
import { CreateUserReq, UserRes } from 'src/proto/user_svc';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    // ----- Сохранение пользователя ----- //
    async save(user: CreateUserReq) {
        this.correctEmail(user.email)
        await this.existUser(user.email)
        
        const hashPassword = this.hashPassword(user.password)
        return await this.prismaService.user.create({
            data: {
                email: user.email,
                password: hashPassword
            }
        })
    }

    // ----- Поиск пользователя ----- //
    async findUser(idOrEmail: string): Promise<UserRes> {
        const pattern = /^[0-9]+$/;
        const userByDb = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    pattern.test(idOrEmail) ? { id: Number(idOrEmail) } : { email: String(idOrEmail) }
                ]
            }
        });

        if(!userByDb) throw new RpcException({
            message: 'Пользователь не найден',
            code: status.NOT_FOUND
        })
        
        return userByDb;
    }
    
    // ----- Приватные функции ----- //
    //USER > FUNCTION

    // --- Хэширование пароля --- //
    private hashPassword(password: string): string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }

    // --- Существует ли пользователь --- //
    private async existUser(email: string): Promise<boolean> {
        const existUser = await this.prismaService.user.findFirst({ where: { email: email } })
        if(existUser) throw new RpcException({
            message: 'Пользователь с такой почтой уже существует',
            code: status.ALREADY_EXISTS
        })
        return
    }

    // --- Корректна ли почта --- //
    //вынести в декоратор (можно потом будет сделать это уневерсальным типо корректность определенных данных)
    private correctEmail(email: string): boolean {
        const emilRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!emilRegx.test(email)) throw new RpcException({
            message: "Некорректная почта",
            code: status.INVALID_ARGUMENT
        })
        return
    }
}