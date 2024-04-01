"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSvcModule = void 0;
const common_1 = require("@nestjs/common");
const user_svc_controller_1 = require("./user-svc.controller");
const microservices_1 = require("@nestjs/microservices");
const user_svc_1 = require("../proto/user_svc");
const path_1 = require("path");
let UserSvcModule = class UserSvcModule {
};
exports.UserSvcModule = UserSvcModule;
exports.UserSvcModule = UserSvcModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: user_svc_1.USER_SERVICE_NAME,
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        url: '0.0.0.0:3001',
                        package: 'user_svc',
                        protoPath: (0, path_1.resolve)(__dirname, '../../proto/user_svc.proto')
                    }
                }
            ])
        ],
        controllers: [user_svc_controller_1.UserSvcController],
    })
], UserSvcModule);
//# sourceMappingURL=user-svc.module.js.map