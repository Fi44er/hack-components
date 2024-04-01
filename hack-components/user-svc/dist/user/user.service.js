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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const prisma_service_1 = require("../prisma/prisma.service");
const grpc_js_1 = require("@grpc/grpc-js");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async save(user) {
        this.correctEmail(user.email);
        await this.existUser(user.email);
        const hashPassword = this.hashPassword(user.password);
        return await this.prismaService.user.create({
            data: {
                email: user.email,
                password: hashPassword
            }
        });
    }
    async findUser(idOrEmail) {
        const pattern = /^[0-9]+$/;
        const userByDb = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    pattern.test(idOrEmail) ? { id: Number(idOrEmail) } : { email: String(idOrEmail) }
                ]
            }
        });
        if (!userByDb)
            throw new microservices_1.RpcException({
                message: 'Пользователь не найден',
                code: grpc_js_1.status.NOT_FOUND
            });
        return userByDb;
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    async existUser(email) {
        const existUser = await this.prismaService.user.findFirst({ where: { email: email } });
        if (existUser)
            throw new microservices_1.RpcException({
                message: 'Пользователь с такой почтой уже существует',
                code: grpc_js_1.status.ALREADY_EXISTS
            });
        return;
    }
    correctEmail(email) {
        const emilRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emilRegx.test(email))
            throw new microservices_1.RpcException({
                message: "Некорректная почта",
                code: grpc_js_1.status.INVALID_ARGUMENT
            });
        return;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map