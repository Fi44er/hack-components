import { status } from '@grpc/grpc-js';
import { Body, Controller, Get, HttpStatus, Inject, OnModuleInit, Param, Post, Res, UnauthorizedException } from '@nestjs/common';
import { AccessToken, CreateUserReq, LoginReq, LogoutReq, LogoutRes, RegisterReq, RegisterRes, USER_SERVICE_NAME, UserRes, UserServiceClient, VerifyCodeBody, VerifyCodeReq, VerifyCodeRes } from '../../proto/user_svc';
import { ClientGrpc } from '@nestjs/microservices';
import { UserAgent } from 'lib/decorators/userAgent.decorator';
import { Response } from 'express';
import { Cookie } from 'lib/decorators/cookies.decorator';
import { Observable } from 'rxjs';

const ACCESS_TOKEN = 'accesstoken'
@Controller('user-svc')
export class UserSvcController implements OnModuleInit {
    private userClient: UserServiceClient;

    constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

    onModuleInit() {
        this.userClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
    }

    //---------- User ---------- //

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

    // -------------------- Auth -------------------- //
    
    // ------ Register ----- //
    @Post('register')
    async register(@Body()dto: RegisterReq): Promise<Observable<RegisterRes>>  {
        const status = this.userClient.register(dto)
        return status
    }

    @Post('login')
    async login(@Body() dto: LoginReq): Promise<Observable<RegisterRes>> {
        const status = this.userClient.login(dto)
        return status
    }


    @Post('verify-code')
    async verifyCode(@Body() body: VerifyCodeBody, @UserAgent() agent: string, @Res() res: Response): Promise<VerifyCodeRes> {
        const verifyCodeReq: VerifyCodeReq = {body: {...body}, agent}
        const token = await this.userClient.verifyCode(verifyCodeReq).toPromise()
        this.setRefreshTokenToCookie(token.accessToken, res)
        return token
    }

    private setRefreshTokenToCookie(token: AccessToken, res: Response) {
        if (!token) throw new UnauthorizedException()
        res.cookie(ACCESS_TOKEN, token.token, {
            httpOnly: true,
            sameSite: 'lax', // все запросы должны отправляться с того же сайта, где мы находимся    
            expires: new Date(Date.now() + token.exp),
            // secure: this.configService.get('NODE_ENV', 'development') === 'production',
            path: '/' // путь по которому будут доступны cookie
        })
        res.status(HttpStatus.CREATED).json({ accessToken: token.token })
    }

    
    // ------ Logout ----- //
    @Post('logout')
    async logout(@Body() { id }: { id: number }, @Cookie(ACCESS_TOKEN) token: string, @Res() res: Response, @UserAgent() agent: string): Promise<Observable<LogoutRes>> { 
        const logoutReq: LogoutReq = {
            id: id,
            agent,
            token: token
        }

        res.cookie(ACCESS_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() })
        res.sendStatus(HttpStatus.OK)
        return this.userClient.logout(logoutReq)
    }
}