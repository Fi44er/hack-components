import { Controller } from '@nestjs/common';
import { RegisterService } from './register.service';
import { GrpcMethod } from '@nestjs/microservices';
import { RegisterReq, RegisterRes } from 'proto/user_svc';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

     // -- POST -- //
    @GrpcMethod('UserService', 'Register')
    async register(dto: RegisterReq): Promise<RegisterRes> {
        return this.registerService.register(dto)
    }
}