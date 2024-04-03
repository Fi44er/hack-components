import { OnModuleInit } from '@nestjs/common';
import { CreateUserReq, UserRes, firstStageRegReq, firstStageRegRes, registerDto } from '../../proto/user_svc';
import { ClientGrpc } from '@nestjs/microservices';
export declare class UserSvcController implements OnModuleInit {
    private readonly client;
    private userClient;
    constructor(client: ClientGrpc);
    onModuleInit(): void;
    createUser(dto: CreateUserReq): Promise<UserRes>;
    getUser(idOrEmail: string): Promise<UserRes>;
    firstStageReg(dto: firstStageRegReq): Promise<firstStageRegRes>;
    secondStageReg(dto: registerDto, agent: string): Promise<any>;
}
