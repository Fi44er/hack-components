import { Controller } from '@nestjs/common';
import { LogoutService } from './logout.service';

@Controller()
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}
}
