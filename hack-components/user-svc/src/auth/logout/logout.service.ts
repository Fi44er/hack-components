import { Injectable } from '@nestjs/common';
import { LogoutReq, LogoutRes } from 'proto/user_svc';
import { PrismaService } from 'src/prisma/prisma.service';
import { status } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class LogoutService {
    constructor(private readonly prismaService: PrismaService) { }
    
    async logout(dto: LogoutReq): Promise<LogoutRes> {
        const { agent, token, id } = dto
        const existToken = await this.prismaService.token.findFirst({
            where: {
                userAgent: agent,
                userId: id,
            }
        })

        if (!existToken) return { status: true }

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

