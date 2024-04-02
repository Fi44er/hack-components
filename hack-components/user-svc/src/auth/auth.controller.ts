import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserRes, firstStageRegReq, firstStageRegRes, secondStageRegReq } from 'proto/user_svc';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @GrpcMethod('AuthService', 'firstStageReg')
    async firstStageRegistration(dto: firstStageRegReq): Promise<firstStageRegRes> {
        return this.authService.firstStageReg(dto)
    }

    @GrpcMethod('AuthService', 'secondStageReg')
    async secondStageRegistration(dto: secondStageRegReq): Promise<UserRes> {
        return this.authService.secondStageReg(dto)
    }
}
