"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const microservices_1 = require("@nestjs/microservices");
const grpc_js_1 = require("@grpc/grpc-js");
const emailer_service_1 = require("../mailer/emailer.service");
let AuthService = class AuthService {
    constructor(prismaService, userService, emailerService) {
        this.prismaService = prismaService;
        this.userService = userService;
        this.emailerService = emailerService;
    }
    async register(dto) {
        const existUser = await this.prismaService.user.findFirst({ where: { email: dto.email } });
        if (existUser)
            throw new microservices_1.RpcException({
                message: "Пользователь с такой почтой уже существует",
                code: grpc_js_1.status.ALREADY_EXISTS
            });
        if (dto.password !== dto.passwordRepeat)
            throw new microservices_1.RpcException({
                message: "Пароли не совпадают",
                code: grpc_js_1.status.INVALID_ARGUMENT
            });
        const code = this.generateVerifyCode();
        await this.emailerService.sendEmail({ code, email: dto.email });
        return { status: true };
    }
    generateVerifyCode() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        emailer_service_1.EmailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map