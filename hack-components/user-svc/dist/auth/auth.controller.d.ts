import { AuthService } from './auth.service';
import { GenerateCodeReq } from 'src/proto/user_svc';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: GenerateCodeReq): Promise<any>;
}
