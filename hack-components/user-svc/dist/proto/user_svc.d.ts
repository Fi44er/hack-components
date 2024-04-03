import { Observable } from "rxjs";
export declare const protobufPackage = "user_svc";
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
export interface ParamsReg {
    firstStageRegReq?: FirstStageRegReq | undefined;
    secondStageRegReq?: SecondStageRegReq | undefined;
}
export declare const USER_SVC_PACKAGE_NAME = "user_svc";
export interface UserServiceClient {
    createUser(request: CreateUserReq): Observable<UserRes>;
    findUser(request: FindUSerReq): Observable<UserRes>;
    registration(request: Observable<ParamsReg>): Observable<UserRes>;
}
export interface UserServiceController {
    createUser(request: CreateUserReq): Promise<UserRes> | Observable<UserRes> | UserRes;
    findUser(request: FindUSerReq): Promise<UserRes> | Observable<UserRes> | UserRes;
    registration(request: Observable<ParamsReg>): Promise<UserRes> | Observable<UserRes> | UserRes;
}
export declare function UserServiceControllerMethods(): (constructor: Function) => void;
export declare const USER_SERVICE_NAME = "UserService";
