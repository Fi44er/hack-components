import { BadRequestException, Body, Controller, Get, Inject, OnModuleInit, Param, Post, UseFilters } from '@nestjs/common';
import { CreateUserReq, USER_SERVICE_NAME, UserRes, UserServiceClient, agent, firstStageRegReq, firstStageRegRes, registerDto, secondStageRegReq } from '../../proto/user_svc';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { UserAgent } from 'lib/decorators/user-agent.decorator';

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

    @Post("first-stage-reg")
    async firstStageReg(@Body()dto: firstStageRegReq): Promise<firstStageRegRes> {
        return this.userClient.firstStageReg(dto).toPromise()
    }

    @Post('second-stage-reg')
    async secondStageReg(@Body()dto: registerDto, @UserAgent() agent: string): Promise<any> {
        
        const secondStageRegReq: secondStageRegReq = {dto, agent: {agent}}
        console.log(secondStageRegReq);
        
        const token = this.userClient.secondStageReg(secondStageRegReq).toPromise();
        return token
    }

    // @Post('login')
    // login(body, @Res() res) {
    //     grpc.login(body)
    //     const metadata = new Metadata()
    //     metadata.get(tokens)

    //     private setcookie(tokens, res)

    //
}