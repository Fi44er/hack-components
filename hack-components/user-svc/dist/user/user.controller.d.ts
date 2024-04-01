import { UserService } from './user.service';
import { CreateUserReq, FindUSerReq, UserRes } from 'src/proto/user_svc';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(user: CreateUserReq): Promise<UserRes>;
    findOne(idOrLogin: FindUSerReq): Promise<UserRes>;
}
