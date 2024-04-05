import { Metadata, status } from '@grpc/grpc-js';
import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, OnModuleInit, Param, Post, Res, UnauthorizedException, UseFilters } from '@nestjs/common';
import { CreateUserReq, RegisterReq, RegisterRes, USER_SERVICE_NAME, UserRes, UserServiceClient, VerifyCodeBody, VerifyCodeReq, VerifyCodeRes } from '../../proto/user_svc';
import { ClientGrpc } from '@nestjs/microservices';
import { UserAgent } from 'lib/decorators/user-agent.decorator';
import { Response } from 'express';
import { Tokens } from './interfasce/tokens';

const ACCESS_TOKEN = 'accesstoken'
@Controller('user-svc')
export class UserSvcController implements OnModuleInit {
    private userClient: UserServiceClient;

    constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

    onModuleInit() {
        this.userClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    @Post('create-user')
    async createUser(@Body()dto: CreateUserReq): Promise<UserRes> {
        const user = await this.userClient.createUser(dto).toPromise(); 
        return user
    }

    @Get('get-user/:idOrEmail')
    async getUser(@Param('idOrEmail') idOrEmail: string): Promise<UserRes> {
        const user = await this.userClient.findUser({idOrEmail}).toPromise();
        return user
    }

    @Post('register')
    async register(@Body()dto: RegisterReq): Promise<RegisterRes> {
        const status = await this.userClient.register(dto).toPromise()
        return status
    }

    @Post('verify-code')
    async verifyCode(@Body() body: VerifyCodeBody, @UserAgent() agent: string, @Res() res: Response): Promise<VerifyCodeRes> {
        const verifyCodeReq: VerifyCodeReq = {body: {...body}, agent}
        const tokens = await this.userClient.verifyCode(verifyCodeReq).toPromise()  
        this.setRefreshTokenToCookie(tokens, res)
        return tokens
    }

    private setRefreshTokenToCookie(tokens: Tokens, res: Response) {
        if (!tokens) throw new UnauthorizedException()
        res.cookie(ACCESS_TOKEN, tokens.accessToken.token, {
            httpOnly: true,
            sameSite: 'lax', // все запросы должны отправляться с того же сайта, где мы находимся    
            expires: new Date(Date.now() + tokens.accessToken.exp),
            // secure: this.configService.get('NODE_ENV', 'development') === 'production',
            path: '/' // путь по которому будут доступны cookie
        })
        res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken })
    }

    // @Post('login')
    // login(body, @Res() res) {
    //     grpc.login(body)
    //     const metadata = new Metadata()
    //     metadata.get(tokens)

    //     private setcookie(tokens, res)

    //
}