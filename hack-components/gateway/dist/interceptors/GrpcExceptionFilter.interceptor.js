"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let GrpcErrorInterceptor = class GrpcErrorInterceptor {
    constructor() {
        this.errorCodeMap = {
            0: common_1.HttpStatus.OK,
            1: common_1.HttpStatus.BAD_REQUEST,
            2: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            3: common_1.HttpStatus.BAD_REQUEST,
            4: common_1.HttpStatus.REQUEST_TIMEOUT,
            5: common_1.HttpStatus.NOT_FOUND,
            6: common_1.HttpStatus.CONFLICT,
            7: common_1.HttpStatus.FORBIDDEN,
            16: common_1.HttpStatus.UNAUTHORIZED,
            8: common_1.HttpStatus.TOO_MANY_REQUESTS,
            9: common_1.HttpStatus.BAD_REQUEST,
            10: common_1.HttpStatus.CONFLICT,
            11: common_1.HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
            12: common_1.HttpStatus.NOT_IMPLEMENTED,
            13: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            14: common_1.HttpStatus.SERVICE_UNAVAILABLE,
            15: common_1.HttpStatus.GONE,
        };
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)(error => {
            const errorCode = error.code;
            const httpStatus = this.errorCodeMap[errorCode];
            if (httpStatus) {
                throw new common_1.HttpException(error.details, httpStatus);
            }
            else {
                return (0, rxjs_1.throwError)(error);
            }
        }));
    }
};
exports.GrpcErrorInterceptor = GrpcErrorInterceptor;
exports.GrpcErrorInterceptor = GrpcErrorInterceptor = __decorate([
    (0, common_1.Injectable)()
], GrpcErrorInterceptor);
//# sourceMappingURL=GrpcExceptionFilter.interceptor.js.map