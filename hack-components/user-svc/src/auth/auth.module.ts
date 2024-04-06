import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { VerifyCodeModule } from './verify-code/verify-code.module';

@Module({
  imports: [RegisterModule, LoginModule, LogoutModule, VerifyCodeModule],
  controllers: [],
})
export class AuthModule {}
