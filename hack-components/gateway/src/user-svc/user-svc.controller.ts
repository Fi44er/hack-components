import { BadRequestException, Body, Controller, Get, Inject, OnModuleInit, Param, Post, UseFilters } from '@nestjs/common';
import { CreateUserReq, FindUSerReq, USER_SERVICE_NAME, UserRes, UserServiceClient } from '../../proto/user_svc';
import { ClientGrpc } from '@nestjs/microservices';

@Controller('user-svc')
export class UserSvcController implements OnModuleInit {
    private userClient: UserServiceClient;

    constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

    onModuleInit() {
        this.userClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    @Post('create-user')
    async createUser(@Body()dto: CreateUserReq): Promise<UserRes> {
        const user = this.userClient.createUser(dto).toPromise(); 
        return user
    }

    @Get('get-user/:idOrEmail')
    async getUser(@Param('idOrEmail') idOrEmail: string): Promise<UserRes> {
        const user = this.userClient.findUser({idOrEmail}).toPromise();
        return user
    }

}