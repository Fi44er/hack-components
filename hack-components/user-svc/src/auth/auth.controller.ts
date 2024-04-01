import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { GenerateCodeReq } from 'src/proto/user_svc';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @GrpcMethod('AuthService', 'register')
    async register(dto: GenerateCodeReq): Promise<any> {
        return this.authService.register(dto)
    }
}
