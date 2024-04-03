/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user_svc";

export interface CreateUserReq {
  email: string;
  password: string;
}

export interface FindUSerReq {
  idOrEmail: string;
}

export interface UserRes {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface firstStageRegReq {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface firstStageRegRes {
  status: boolean;
}

export interface registerDto {
  email: string;
  password: string;
  code: number;
}

export interface agent {
  agent: string;
}

export interface secondStageRegReq {
  dto: registerDto | undefined;
  agent: agent | undefined;
}

export const USER_SVC_PACKAGE_NAME = "user_svc";

export interface UserServiceClient {
  createUser(request: CreateUserReq): Observable<UserRes>;

  findUser(request: FindUSerReq): Observable<UserRes>;

  firstStageReg(request: firstStageRegReq): Observable<firstStageRegRes>;

  secondStageReg(request: secondStageRegReq): Observable<UserRes>;
}

export interface UserServiceController {
  createUser(request: CreateUserReq): Promise<UserRes> | Observable<UserRes> | UserRes;

  findUser(request: FindUSerReq): Promise<UserRes> | Observable<UserRes> | UserRes;

  firstStageReg(request: firstStageRegReq): Promise<firstStageRegRes> | Observable<firstStageRegRes> | firstStageRegRes;

  secondStageReg(request: secondStageRegReq): Promise<UserRes> | Observable<UserRes> | UserRes;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findUser", "firstStageReg", "secondStageReg"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
