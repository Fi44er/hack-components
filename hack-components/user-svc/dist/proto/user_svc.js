"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_SERVICE_NAME = exports.AuthServiceControllerMethods = exports.USER_SERVICE_NAME = exports.UserServiceControllerMethods = exports.USER_SVC_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.protobufPackage = "user_svc";
exports.USER_SVC_PACKAGE_NAME = "user_svc";
function UserServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["createUser", "findUser"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("UserService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("UserService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.UserServiceControllerMethods = UserServiceControllerMethods;
exports.USER_SERVICE_NAME = "UserService";
function AuthServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["register", "verifyCode"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("AuthService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("AuthService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.AuthServiceControllerMethods = AuthServiceControllerMethods;
exports.AUTH_SERVICE_NAME = "AuthService";
//# sourceMappingURL=user_svc.js.map