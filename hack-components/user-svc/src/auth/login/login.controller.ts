import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginReq, RegisterRes, VerifyCodeReq, VerifyCodeRes } from 'proto/user_svc';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @GrpcMethod('UserService', 'Login')
  async login(dto: LoginReq): Promise<RegisterRes> {
    return this.loginService.login(dto)
  }
}
