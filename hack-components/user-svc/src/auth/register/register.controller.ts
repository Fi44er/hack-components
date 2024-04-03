import { Controller } from '@nestjs/common';
import { RegisterService } from './register.service';
import { GrpcMethod } from '@nestjs/microservices';
import { FirstStageRegRes, SecondStageRegReq, FirstStageRegReq } from 'proto/user_svc';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  // -- POST -- //
  @GrpcMethod('UserService', 'FirstStageReg')
    async firstStageReg(dto: FirstStageRegReq): Promise<FirstStageRegRes> {
        return this.registerService.firstStageReg(dto)
    }

    // -- POST -- //
    @GrpcMethod('UserService', 'SecondStageReg')
    async secondStageReg(dto: SecondStageRegReq): Promise<any> {
        const tokens = await this.registerService.secondStageReg(dto)
        return tokens
    }
}
