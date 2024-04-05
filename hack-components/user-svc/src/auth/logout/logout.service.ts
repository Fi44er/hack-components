import { UserAgent } from './../../../../gateway/lib/decorators/user-agent.decorator';
import { Injectable } from '@nestjs/common';
import { RegisterService } from '../register/register.service';
import { LogoutReq, LogoutRes, RegisterReq } from 'proto/user_svc';
import { PrismaService } from 'src/prisma/prisma.service';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LogoutService {
    constructor(private readonly prismaService: PrismaService) { }
    
    async logout(dto: LogoutReq): Promise<LogoutRes> {
        const { agent, token, id } = dto
        if (!token) throw new RpcException({
            message: "Полльзователь не авторизирован",
            status: status.UNAUTHENTICATED,
        })

        const existToken = await this.prismaService.token.findFirst({
            where: {
                userAgent: agent,
                userId: id,
            }
        })

        await this.prismaService.token.delete(
            {
                where: { 
                    token: existToken.token,
                }
            }
        );
        return { status: true }
    }
}

