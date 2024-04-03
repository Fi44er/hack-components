import { Module } from '@nestjs/common';
import { GenerateTokensService } from './generate-tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { options } from 'src/auth/config';

@Module({
  imports: [JwtModule.registerAsync(options())],
  controllers: [],
  providers: [GenerateTokensService],
  exports: [GenerateTokensService],
})
export class GenerateTokensModule {}
