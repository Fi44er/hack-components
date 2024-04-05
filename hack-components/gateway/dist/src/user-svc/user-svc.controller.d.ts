import { OnModuleInit } from '@nestjs/common';
import { CreateUserReq, LogoutRes, RegisterReq, RegisterRes, UserRes, VerifyCodeBody, VerifyCodeRes } from '../../proto/user_svc';
import { ClientGrpc } from '@nestjs/microservices';
import { Response } from 'express';
import { Observable } from 'rxjs';
export declare class UserSvcController implements OnModuleInit {
    private readonly client;
    private userClient;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    createUser(dto: CreateUserReq): Promise<UserRes>;
    getUser(idOrEmail: string): Promise<UserRes>;
    register(dto: RegisterReq): Promise<Observable<RegisterRes>>;
    verifyCode(body: VerifyCodeBody, agent: string, res: Response): Promise<VerifyCodeRes>;
    private setRefreshTokenToCookie;
    logout({ id }: {
        id: number;
    }, token: string, res: Response, agent: string): Promise<Observable<LogoutRes>>;
}
