import { OnModuleInit } from '@nestjs/common';
import { CreateUserReq, RegisterReq, RegisterRes, UserRes, VerifyCodeBody, VerifyCodeRes } from '../../proto/user_svc';
import { ClientGrpc } from '@nestjs/microservices';
import { Response } from 'express';
export declare class UserSvcController implements OnModuleInit {
    private readonly client;
    private userClient;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    createUser(dto: CreateUserReq): Promise<UserRes>;
    getUser(idOrEmail: string): Promise<UserRes>;
    register(dto: RegisterReq): Promise<RegisterRes>;
    verifyCode(body: VerifyCodeBody, agent: string, res: Response): Promise<VerifyCodeRes>;
    private setRefreshTokenToCookie;
}
