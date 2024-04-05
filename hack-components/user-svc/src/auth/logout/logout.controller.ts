import { Controller } from '@nestjs/common';
import { LogoutService } from './logout.service';
import { GrpcMethod } from '@nestjs/microservices';
import { LogoutReq, LogoutRes } from 'proto/user_svc';

@Controller()
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) { }
  
  @GrpcMethod('UserService', 'Logout')
  async logoutUser(dto: LogoutReq): Promise<LogoutRes> {
    console.log(dto)
    return this.logoutService.logout(dto);
  }
  
}
