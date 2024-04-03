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
export declare const USER_SVC_PACKAGE_NAME = "user_svc";
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
export declare function UserServiceControllerMethods(): (constructor: Function) => void;
export declare const USER_SERVICE_NAME = "UserService";
