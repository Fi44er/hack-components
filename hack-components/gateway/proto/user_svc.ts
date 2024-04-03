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

export interface FirstStageRegReq {
  email: string;
  password: string;
  passwordRepeat: string;
}

export interface FirstStageRegRes {
  status: boolean;
}

export interface RegisterDto {
  email: string;
  password: string;
  code: number;
}

export interface Agent {
  agent: string;
}

export interface SecondStageRegReq {
  dto: RegisterDto | undefined;
  agent: Agent | undefined;
}

export const USER_SVC_PACKAGE_NAME = "user_svc";

export interface UserServiceClient {
  createUser(request: CreateUserReq): Observable<UserRes>;

  findUser(request: FindUSerReq): Observable<UserRes>;

  firstStageReg(request: FirstStageRegReq): Observable<FirstStageRegRes>;

  secondStageReg(request: SecondStageRegReq): Observable<UserRes>;
}

export interface UserServiceController {
  createUser(request: CreateUserReq): Promise<UserRes> | Observable<UserRes> | UserRes;

  findUser(request: FindUSerReq): Promise<UserRes> | Observable<UserRes> | UserRes;

  firstStageReg(request: FirstStageRegReq): Promise<FirstStageRegRes> | Observable<FirstStageRegRes> | FirstStageRegRes;

  secondStageReg(request: SecondStageRegReq): Promise<UserRes> | Observable<UserRes> | UserRes;
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
