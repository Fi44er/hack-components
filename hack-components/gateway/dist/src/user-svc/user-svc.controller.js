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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSvcController = void 0;
const common_1 = require("@nestjs/common");
const user_svc_1 = require("../../proto/user_svc");
const user_agent_decorator_1 = require("../../lib/decorators/user-agent.decorator");
const ACCESS_TOKEN = 'accesstoken';
let UserSvcController = class UserSvcController {
    constructor(client) {
        this.client = client;
    }
    onModuleInit() {
        this.userClient = this.client.getService(user_svc_1.USER_SERVICE_NAME);
    }
    async createUser(dto) {
        const user = await this.userClient.createUser(dto).toPromise();
        return user;
    }
    async getUser(idOrEmail) {
        const user = await this.userClient.findUser({ idOrEmail }).toPromise();
        return user;
    }
    async register(dto) {
        const status = await this.userClient.register(dto).toPromise();
        return status;
    }
    async verifyCode(body, agent, res) {
        const verifyCodeReq = { body: { ...body }, agent };
        const tokens = await this.userClient.verifyCode(verifyCodeReq).toPromise();
        this.setRefreshTokenToCookie(tokens, res);
        return tokens;
    }
    setRefreshTokenToCookie(tokens, res) {
        if (!tokens)
            throw new common_1.UnauthorizedException();
        res.cookie(ACCESS_TOKEN, tokens.accessToken.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(Date.now() + tokens.accessToken.exp),
            path: '/'
        });
        res.status(common_1.HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
    }
};
exports.UserSvcController = UserSvcController;
__decorate([
    (0, common_1.Post)('create-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSvcController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('get-user/:idOrEmail'),
    __param(0, (0, common_1.Param)('idOrEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserSvcController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSvcController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('verify-code'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_agent_decorator_1.UserAgent)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserSvcController.prototype, "verifyCode", null);
exports.UserSvcController = UserSvcController = __decorate([
    (0, common_1.Controller)('user-svc'),
    __param(0, (0, common_1.Inject)(user_svc_1.USER_SERVICE_NAME)),
    __metadata("design:paramtypes", [Object])
], UserSvcController);
//# sourceMappingURL=user-svc.controller.js.map