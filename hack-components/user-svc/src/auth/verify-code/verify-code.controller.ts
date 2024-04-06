import { GrpcMethod } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { VerifyCodeService } from './verify-code.service';
import { VerifyCodeReq, VerifyCodeRes } from 'proto/user_svc';

@Controller('verify-code')
export class VerifyCodeController {
  constructor(private readonly verifyCodeService: VerifyCodeService) {}

  @GrpcMethod('UserService', 'VerifyCode')
    async verifyCode(dto: VerifyCodeReq): Promise<VerifyCodeRes> {       
        return this.verifyCodeService.verifyCode(dto)
    }
}
