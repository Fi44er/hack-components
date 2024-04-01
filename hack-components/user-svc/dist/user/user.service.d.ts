import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserReq, UserRes } from 'src/proto/user_svc';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    save(user: CreateUserReq): Promise<{
        id: number;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Roles;
    }>;
    findUser(idOrEmail: string): Promise<UserRes>;
    private hashPassword;
    private existUser;
    private correctEmail;
}
