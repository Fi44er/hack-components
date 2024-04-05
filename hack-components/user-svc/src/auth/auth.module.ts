import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';

@Module({
  imports: [RegisterModule, LoginModule, LogoutModule],
  controllers: [],
})
export class AuthModule {}
