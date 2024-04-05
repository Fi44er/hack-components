import { Controller } from '@nestjs/common';
import { RegisterService } from './register.service';
import { GrpcMethod } from '@nestjs/microservices';
import { RegisterReq, RegisterRes, VerifyCodeReq, VerifyCodeRes } from 'proto/user_svc';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

     // -- POST -- //
    @GrpcMethod('UserService', 'Register')
    async register(dto: RegisterReq): Promise<RegisterRes> {
        return this.registerService.register(dto)
    }

    // -- POST -- //
    @GrpcMethod('UserService', 'VerifyCode')
    async verifyCode(dto: VerifyCodeReq): Promise<VerifyCodeRes> {       
        return this.registerService.verifyCode(dto)
    }
}