import { Controller } from '@nestjs/common';
import { RegisterService } from './register.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserRes, firstStageRegReq, firstStageRegRes, secondStageRegReq } from 'proto/user_svc';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @GrpcMethod('UserService', 'FirstStageReg')
    // -- POST -- //
    async firstStageReg(dto: firstStageRegReq): Promise<firstStageRegRes> {
        return this.registerService.firstStageReg(dto)
    }

    // -- POST -- //
    @GrpcMethod('UserService', 'SecondStageReg')
    async secondStageReg(dto: secondStageRegReq): Promise<any> {
      console.log(dto);
      
        const tokens =  this.registerService.secondStageReg(dto)
        return tokens
    }
}
