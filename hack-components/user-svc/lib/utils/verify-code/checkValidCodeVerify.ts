import { ConfigService } from "@nestjs/config"
import { status } from "@grpc/grpc-js"
import { RpcException } from "@nestjs/microservices"

export const checkValidCodeVerify = async (createdAt: Date, config: ConfigService) => {
    const codeExp = await config.get('CODE_EXP')
    const codeDate = new Date(createdAt)
    codeDate.setMinutes(codeDate.getMinutes() + +codeExp)

    const dateNow = new Date(Date.now())

    if(codeDate < dateNow) throw new RpcException({
        message: "Код верификации истек",
        code: status.INVALID_ARGUMENT
    })
}